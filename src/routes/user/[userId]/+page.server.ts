import { PRIVATE_API_SERVER_DOMAIN } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch, params, locals }) => {
	const getUserEndpoint = new URL(`/users/${params.userId}`, PRIVATE_API_SERVER_DOMAIN);

	const getUserRes = await fetch(getUserEndpoint);

	if (getUserRes.status == 404) {
		error(404, {
			message: '사용자를 찾을 수 없습니다'
		});
	}
	const targetUser = await getUserRes.json();

	const isFollowingEndpoint = new URL(
		`/users/${locals.userId}/followings/${params.userId}`,
		PRIVATE_API_SERVER_DOMAIN
	);
	const isFollowingRes = await fetch(isFollowingEndpoint, { method: 'GET' });

	const isFollowing = isFollowingRes.status === 204 ? true : false;

	return {
		targetUser,
		isFollowing
	};
};
