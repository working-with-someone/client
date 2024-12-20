import { PUBLIC_AUTH_SERVER_DOMAIN, PUBLIC_CLIENT_SERVER_DOMAIN } from '$env/static/public';

import { PRIVATE_API_SERVER_DOMAIN } from '$env/static/private';

import { redirect, type Load } from '@sveltejs/kit';

export const load: Load = async ({ fetch }) => {
	const getUserSelfURL = new URL('/users/self', PRIVATE_API_SERVER_DOMAIN);

	const res = await fetch(getUserSelfURL);

	if (res.status == 401) {
		const redirectURL = new URL('/', PUBLIC_CLIENT_SERVER_DOMAIN);
		const loginURL = new URL('/auth/login', PUBLIC_AUTH_SERVER_DOMAIN);
		loginURL.searchParams.append('continue_uri', redirectURL.toString());

		redirect(302, loginURL);
	}

	const data = await res.json();

	return { user: data };
};
