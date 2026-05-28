import { PRIVATE_API_SERVER_DOMAIN } from '$env/static/private';
import { error, type Load } from '@sveltejs/kit';
import httpStatusCode from 'http-status-codes';
import type { VideoSessionWithAll } from '../../../../types/session';

export const load: Load = async ({ fetch, params }) => {
	const { sessionId } = params;

	const getVideoSessionEndpoint = new URL(
		`/sessions/video/${sessionId}`,
		PRIVATE_API_SERVER_DOMAIN
	);

	const getVideoSessionRes = await fetch(getVideoSessionEndpoint);

	if (getVideoSessionRes.status == httpStatusCode.NOT_FOUND) {
		error(httpStatusCode.NOT_FOUND, {
			status: httpStatusCode.NOT_FOUND,
			statusText: httpStatusCode.getStatusText(httpStatusCode.NOT_FOUND),
			message: 'can not find video session'
		});
	}

	const body = await getVideoSessionRes.json();
	const videoSession = body.data as VideoSessionWithAll;

	return {
		videoSession
	};
};
