import { error } from "@sveltejs/kit";
import wwsfetch from "$lib/utils/wwsfetch";
import { liveSessionStatus } from "../../../../enums/session";
import { Prisma } from "@prisma/client";

export class LiveSession implements Prisma.live_sessionGetPayload<{
  include: {
    break_time: true
  }
}> {
  id: string;
  title: string;
  description: string | null;
  thumbnail_uri: string;
  category: string;
  status = $state<number>() as number;
  stream_key: string;
  access_level: number;
  created_at: Date;
  updated_at: Date;
  started_at: Date | null;
  organizer_id: number;
  break_time: { session_id: string; interval: number; duration: number; } | null;

  constructor(
    liveSession: Prisma.live_sessionGetPayload<true>,
    breakTime: Prisma.break_timeGetPayload<true> | null
  ) {
    this.id = liveSession.id;
    this.title = liveSession.title;
    this.description = liveSession.description;
    this.thumbnail_uri = liveSession.thumbnail_uri;
    this.category = liveSession.category;
    this.status = liveSession.status;
    this.stream_key = liveSession.stream_key;
    this.access_level = liveSession.access_level;
    this.created_at = new Date(liveSession.created_at);
    this.updated_at = new Date(liveSession.updated_at);

    this.started_at = liveSession.started_at ? new Date(liveSession.started_at) : null;

    this.organizer_id = liveSession.organizer_id;

    this.break_time = breakTime;
  }


  get isReady() {
    return this.status === liveSessionStatus.ready;
  }

  get isOpened() {
    return this.status === liveSessionStatus.opened;
  }

  get isBreaked() {
    return this.status === liveSessionStatus.breaked;
  }

  get isClosed() {
    return this.status === liveSessionStatus.closed;
  }

  get breakTimeEnabled() {
    return this.break_time ? true : false;
  }

  async fetch() {
    const res = await wwsfetch(`/sessions/live/${this.id}`, {});

    if (res.status != 200) {
      error(res.status);
    }

    const liveSession = await res.json();

    Object.assign(this, liveSession);
  }
}

export class UpdatableLiveSession extends LiveSession {
  constructor(
    liveSession: Prisma.live_sessionGetPayload<true>,
    breakTime: Prisma.break_timeGetPayload<true> | null
  ) {
    super(liveSession, breakTime);
  }

  async changeStatus(status: liveSessionStatus) {
    const res = await wwsfetch(`/sessions/live/${this.id}/status`, {
      method: 'PUT',
      body: new URLSearchParams({
        status: status.toString()
      })
    });

    // failed
    if (!res.ok) {
      throw new Error('can not change status of session');
    }

    await this.fetch();
  }
}