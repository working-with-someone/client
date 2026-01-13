export function convertToTime(
	value: number,
	unit: 'h' | 'm' | 's' | 'ms'
): { hours: string; minutes: string; seconds: string } {
	// 단위를 밀리초로 먼저 변환
	const toMilliseconds = (val: number, u: 'h' | 'm' | 's' | 'ms'): number => {
		const conversions = {
			h: 3600000,
			m: 60000,
			s: 1000,
			ms: 1
		};
		return val * (conversions[u] || 1);
	};

	const totalMs = toMilliseconds(value, unit);

	const hours = Math.floor(totalMs / (1000 * 60 * 60));
	const remainingMs = totalMs % (1000 * 60 * 60);

	const minutes = Math.floor(remainingMs / (1000 * 60));
	const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);

	return {
		hours: String(hours).padStart(2, '0'),
		minutes: String(minutes).padStart(2, '0'),
		seconds: String(seconds).padStart(2, '0')
	};
}

export function timeDifference(from: number | string | Date, to: number | string | Date) {
	const _from = new Date(from).getTime();
	const _to = new Date(to).getTime();

	const diff = Math.abs(_to - _from);

	return convertToTime(diff, 'ms');
}

export function toMilliseconds(value: number, unit: 'h' | 'm' | 's' | 'ms'): number {
	const conversions = {
		h: 3600000,
		m: 60000,
		s: 1000,
		ms: 1
	};

	return value * (conversions[unit] || 1);
}

export function toSeconds(value: number, unit: 'h' | 'm' | 's' | 'ms'): number {
	const conversions = {
		h: 3600,
		m: 60,
		s: 1,
		ms: 1 / 1000
	};

	return value * (conversions[unit] || 1);
}

export function toMinutes(value: number, unit: 'h' | 'm' | 's' | 'ms'): number {
	const conversions = {
		h: 60,
		m: 1,
		s: 1 / 60,
		ms: 1 / 60000
	};

	return value * (conversions[unit] || 1);
}
