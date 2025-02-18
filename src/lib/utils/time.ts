export function timeDifference(from: number | string | Date, to: number | string | Date) {
	const _from = new Date(from).getTime();
	const _to = new Date(to).getTime();

	let diff = Math.abs(_to - _from);

	const hours = Math.floor(diff / (1000 * 60 * 60));
	diff -= hours * (1000 * 60 * 60);

	const minutes = Math.floor(diff / (1000 * 60));
	diff -= minutes * (1000 * 60);

	const seconds = Math.floor(diff / 1000);

	return {
		hours: String(hours).padStart(2, '0'),
		minutes: String(minutes).padStart(2, '0'),
		seconds: String(seconds).padStart(2, '0')
	};
}
