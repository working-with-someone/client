import type { PublicUserInfo } from './user';

export type SessionMode = 'live' | 'video';

export interface Session {
	title: string;
	thumbnail: string;
	time: number;
	user: PublicUserInfo;
	isLive: boolean;
}

export interface CategorizedSessions {
	category: string;
	sessions: Session[];
}

export type LiveSessionWithAll = Prisma.live_sessionGetPayload<{
	include: {
		break_time: true;
		category: true;
		live_session_transition_log: true;
		organizer: true;
	};
}>;
