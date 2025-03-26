import { convertMillisecondsToTime, toMilliseconds } from '$lib/utils/time';
import type { break_time } from '@prisma/client';
import Schedular from '../Schedular.svelte';

export class BreakTimeSchedular extends Schedular {
	duration: number;
	interval: number;
	private nextBreakTime: number;
	private nextOpenTime: number;
	private isBreakTime: boolean = false;
	private currentScheduleId: number | null = null;

	constructor(breakTime: { interval: break_time['interval']; duration: break_time['duration'] }) {
		super();
		this.duration = toMilliseconds(breakTime.duration, 'm');
		this.interval = toMilliseconds(breakTime.interval, 'm');

		this.nextBreakTime = Date.now();
		this.nextOpenTime = Date.now();
	}

	start(openCb: () => void, breakCb: () => void) {
		const now = Date.now();
		this.nextBreakTime = now + this.interval;
		this.nextOpenTime = this.nextBreakTime + this.duration;

		const scheduleNext = () => {
			const now = Date.now();

			if (!this.isBreakTime && now >= this.nextBreakTime) {
				this.isBreakTime = true;
				breakCb();
				this.nextOpenTime = now + this.duration;
				this.currentScheduleId = this.set(this.duration, 'ms', scheduleNext);
			} else if (this.isBreakTime && now >= this.nextOpenTime) {
				this.isBreakTime = false;
				openCb();
				this.nextBreakTime = now + this.interval;
				this.currentScheduleId = this.set(this.interval, 'ms', scheduleNext);
			}
		};

		const delay = Math.max(0, this.nextBreakTime - Date.now());
		this.currentScheduleId = this.set(delay, 'ms', scheduleNext);
	}

	get remainTimeUntilBreak() {
		return convertMillisecondsToTime(
			this.isBreakTime ? 0 : Math.max(0, this.nextBreakTime - Date.now())
		);
	}

	get remainTimeUntilOpen() {
		return convertMillisecondsToTime(
			this.isBreakTime ? Math.max(0, this.nextOpenTime - Date.now()) : 0
		);
	}

	stop() {
		if (this.currentScheduleId !== null) {
			this.cancel(this.currentScheduleId);
			this.currentScheduleId = null;
		}
	}
}
