export interface ChatLog {
	msg: string;
	user: {
		userId: number;
		username: string;
		pfp: string;
	};
	created_at: string;
}
