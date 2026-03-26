async function extractVideoFrames(videoFile: File) {
	return new Promise((resolve, reject) => {
		const video = document.createElement('video');
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		if (!ctx) {
			cleanup();
			return reject(new Error('Canvas 2D context is not available'));
		}

		const frames: string[] = [];
		let duration = 0;

		// when video metadata is loaded
		video.addEventListener('loadedmetadata', () => {
			duration = video.duration;

			const timePoints = [duration * 0.1, duration * 0.5, duration * 0.9];

			let extractedCount = 0;

			// seek to each time point and extract frames
			timePoints.forEach((time, index) => {
				video.currentTime = time;

				const seekHandler = () => {
					// fit to video dimensions
					canvas.width = video.videoWidth;
					canvas.height = video.videoHeight;

					// draw video frame onto canvas
					ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

					// extract image data URL
					const imageDataUrl = canvas.toDataURL('image/jpeg', 1);
					frames[index] = imageDataUrl;

					extractedCount++;

					if (extractedCount === timePoints.length) {
						cleanup();
						resolve(frames);
					}
				};

				video.addEventListener('seeked', seekHandler, { once: true });
			});
		});

		video.addEventListener('error', (error) => {
			cleanup();
			reject(new Error(`video load failed: ${error.message}`));
		});

		function cleanup() {
			video.pause();
			video.src = '';
			video.load();
			URL.revokeObjectURL(video.src);
		}

		const videoUrl = URL.createObjectURL(videoFile);
		video.src = videoUrl;
		video.preload = 'metadata';
	});
}
