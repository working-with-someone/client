import type { Prisma } from '@prisma/client';

export type CommentWithAll = Prisma.video_session_commentGetPayload<{
	include: {
		user: {
			include: {
				pfp: true;
			};
		};
		likes: true;
	};
}>;
