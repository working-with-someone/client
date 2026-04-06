export async function generateThumbnails(
	source: File | Blob | string,
	count: number = 1
): Promise<File[]> {
	let inputBlob: Blob;
	if (typeof source === 'string') {
		const res = await fetch(source, { mode: 'cors' });
		if (!res.ok) throw new Error(`Failed to fetch video: ${res.status} ${res.statusText}`);
		inputBlob = await res.blob();
	} else if (source instanceof Blob) {
		inputBlob = source;
	} else {
		throw new Error('generateThumbnails: source must be a URL string, File, or Blob');
	}

	return new Promise<File[]>((resolve, reject) => {
		const video = document.createElement('video');
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		if (!ctx) {
			return reject(new Error('Canvas 2D context is not available'));
		}

		const frames: File[] = [];
		let duration = 0;
		let videoUrl: string | null = null;

		// cleanup utility
		function cleanup() {
			try {
				video.pause();
				video.src = '';
				video.load();
			} catch (e) {
				// ignore
			}

			if (videoUrl) {
				try {
					URL.revokeObjectURL(videoUrl);
				} catch (e) {
					// ignore
				}
				videoUrl = null;
			}
		}

		// when video metadata is loaded
		video.addEventListener('loadedmetadata', () => {
			duration = video.duration;

			// clamp duration
			if (!isFinite(duration) || duration <= 0) {
				cleanup();
				return reject(new Error('Invalid video duration'));
			}

			// random time points (avoid exactly 0 or duration)
			const timePoints = Array.from({ length: count }, () =>
				Math.min(Math.max(Math.random() * duration, 0.1), duration - 0.1)
			);

			let extractedCount = 0;

			// seek to each time point and extract frames
			timePoints.forEach((time, index) => {
				video.currentTime = time;

				const seekHandler = () => {
					// fit to video dimensions
					canvas.width = video.videoWidth || 640;
					canvas.height = video.videoHeight || 360;

					try {
						ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

						// convert canvas to Blob then to File
						canvas.toBlob(
							(blob) => {
								if (blob) {
									const file = new File([blob], `thumbnail-${index}.jpg`, {
										type: 'image/jpeg',
										lastModified: Date.now()
									});
									frames[index] = file;
								} else {
									frames[index] = new File([], `thumbnail-${index}.jpg`, { type: 'image/jpeg' });
								}

								extractedCount++;

								if (extractedCount === timePoints.length) {
									cleanup();
									resolve(frames);
								}
							},
							'image/jpeg',
							0.92
						);
					} catch (e) {
						// on drawing error, create an empty file placeholder
						frames[index] = new File([], `thumbnail-${index}.jpg`, { type: 'image/jpeg' });
						extractedCount++;

						if (extractedCount === timePoints.length) {
							cleanup();
							resolve(frames);
						}
					}
				};

				video.addEventListener('seeked', seekHandler, { once: true });
			});
		});

		video.addEventListener('error', (error) => {
			cleanup();
			reject(new Error(`video load failed: ${error?.message ?? error}`));
		});

		// create object URL from blob and start loading
		videoUrl = URL.createObjectURL(inputBlob);
		video.src = videoUrl;
		video.preload = 'metadata';
	});
}
