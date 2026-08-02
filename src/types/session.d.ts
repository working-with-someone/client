import type { PublicUser } from './api-contracts/user';
export type SessionMode = 'live' | 'video';

export interface Session {
	title: string;
	thumbnail: string;
	time: number;
	user: PublicUser;
	isLive: boolean;
}

export interface CategorizedSessions {
	category: string;
	sessions: Session[];
}
