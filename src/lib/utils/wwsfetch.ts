import { redirect } from '@sveltejs/kit';
import {
	PUBLIC_API_SERVER_DOMAIN,
	PUBLIC_CLIENT_SERVER_DOMAIN,
	PUBLIC_AUTH_SERVER_DOMAIN
} from '$env/static/public';
import { wwsError } from '$lib/error/wwsError';
import httpStatusCode from 'http-status-codes';

interface Option extends RequestInit {
	baseUrl?: string;
	queryParams?: Record<string, string>;
}

async function wwsfetch(path: string, options: Option) {
	options.credentials = 'include';

	const endPoint = new URL(path, options?.baseUrl ? options?.baseUrl : PUBLIC_API_SERVER_DOMAIN);

	if (options?.queryParams) {
		Object.entries(options.queryParams).forEach(([key, value]) => {
			endPoint.searchParams.append(key, value);
		});
	}

	const res = await fetch(endPoint, {
		...options
	});

	if (res.status === 401) {
		const redirectURL = new URL('/', PUBLIC_CLIENT_SERVER_DOMAIN);
		const loginURL = new URL('/auth/login', PUBLIC_AUTH_SERVER_DOMAIN);
		loginURL.searchParams.append('continue_uri', redirectURL.toString());

		return redirect(302, loginURL);
	}

	if (!res.ok) {
		const body = (await res.json()) || httpStatusCode.getStatusText(res.status);

		throw new wwsError(res.status, body.message);
	}

	return res;
}

export default wwsfetch;
