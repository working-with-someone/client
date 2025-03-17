import { toMilliseconds } from '$lib/utils/time';

export class Schedular {
	private schedules: Map<number, NodeJS.Timeout> = new Map();
	private counter = 0;

	set(ms: number, cb: () => void): number {
		const scheduleId = this.counter++;

		const timeout = setTimeout(() => {
			cb();
			this.schedules.delete(scheduleId);
		}, ms);

		this.schedules.set(scheduleId, timeout);

		return scheduleId;
	}

	setInterval(ms: number, cb: () => void): number {
		const scheduleId = this.counter++;

		const interval = setInterval(cb, ms);
		this.schedules.set(scheduleId, interval);

		return scheduleId;
	}

	cancel(scheduleId: number): void {
		const timeoutId = this.schedules.get(scheduleId);

		if (timeoutId) {
			clearTimeout(timeoutId);
			this.schedules.delete(scheduleId);
		}
	}
}

export default Schedular;
