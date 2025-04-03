import { toMilliseconds } from '$lib/utils/time';

export class Schedular {
	private schedules = new Map<number, number>();
	private idCounter: number = 0;

	set(value: number, unit: 'h' | 'm' | 's' | 'ms', cb: () => void) {
		const scheduleId = this.idCounter++;
		const ms = toMilliseconds(value, unit);

		const timeoutId = setTimeout(() => {
			cb();
			this.schedules.delete(scheduleId);
		}, ms);

		this.schedules.set(scheduleId, timeoutId);

		return scheduleId;
	}

	setInterval(value: number, unit: 'h' | 'm' | 's' | 'ms', cb: () => void) {
		const scheduleId = this.idCounter++;
		const ms = toMilliseconds(value, unit);

		const intervalId = setInterval(() => {
			cb();
			this.schedules.delete(scheduleId);
		}, ms);

		this.schedules.set(scheduleId, intervalId);

		return scheduleId;
	}

	cancel(scheduleId: number) {
		const schedule = this.schedules.get(scheduleId);

		if (schedule) {
			clearTimeout(this.schedules.get(scheduleId));
			clearInterval(this.schedules.get(scheduleId));

			this.schedules.delete(scheduleId);
		}
	}
}

export default Schedular;
