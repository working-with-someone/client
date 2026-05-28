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
		let videoUrl: string | null = null;

		// cleanup utility
		function cleanup() {
			try {
				video.pause();
				video.src = '';
				video.load();
			} catch (e) {}

			if (videoUrl) {
				try {
					URL.revokeObjectURL(videoUrl);
				} catch (e) {}
				videoUrl = null;
			}
		}

		// 비동기로 특정 시점의 프레임을 추출하는 헬퍼 함수
		function captureFrameAtTime(time: number, index: number): Promise<File> {
			return new Promise((resCapture) => {
				const seekHandler = () => {
					canvas.width = video.videoWidth || 640;
					canvas.height = video.videoHeight || 360;

					try {
						ctx!.drawImage(video, 0, 0, canvas.width, canvas.height);

						canvas.toBlob(
							(blob) => {
								if (blob) {
									resCapture(
										new File([blob], `thumbnail-${index}.jpg`, {
											type: 'image/jpeg',
											lastModified: Date.now()
										})
									);
								} else {
									resCapture(new File([], `thumbnail-${index}.jpg`, { type: 'image/jpeg' }));
								}
							},
							'image/jpeg',
							0.92
						);
					} catch (e) {
						resCapture(new File([], `thumbnail-${index}.jpg`, { type: 'image/jpeg' }));
					}
				};

				// 한 번만 실행되도록 listen
				video.addEventListener('seeked', seekHandler, { once: true });
				video.currentTime = time;
			});
		}

		// when video metadata is loaded
		video.addEventListener('loadedmetadata', async () => {
			const duration = video.duration;

			// clamp duration
			if (!isFinite(duration) || duration <= 0) {
				cleanup();
				return reject(new Error('Invalid video duration'));
			}

			// 랜덤 시간 포인트 생성
			const timePoints = Array.from({ length: count }, () =>
				Math.min(Math.max(Math.random() * duration, 0.1), duration - 0.1)
			);

			try {
				// 순차적으로(하나씩 순서대로) 비디오 탐색 및 캡처 진행
				for (let i = 0; i < timePoints.length; i++) {
					const file = await captureFrameAtTime(timePoints[i], i);
					frames.push(file);
				}

				cleanup();
				resolve(frames);
			} catch (err) {
				cleanup();
				reject(err);
			}
		});

		video.addEventListener('error', (error) => {
			cleanup();
			reject(new Error(`video load failed: ${error?.message ?? error}`));
		});

		videoUrl = URL.createObjectURL(inputBlob);
		video.src = videoUrl;
		video.preload = 'metadata';
	});
}
