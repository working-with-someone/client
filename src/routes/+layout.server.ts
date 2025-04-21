import { PRIVATE_API_SERVER_DOMAIN } from '$env/static/private';

import { type Load } from '@sveltejs/kit';

export const load: Load = async ({ fetch }) => {
	const getUserSelfURL = new URL('/users/self', PRIVATE_API_SERVER_DOMAIN);

	const res = await fetch(getUserSelfURL);

	const body = await res.json();
	const user = body.data;

	return { user };
};
