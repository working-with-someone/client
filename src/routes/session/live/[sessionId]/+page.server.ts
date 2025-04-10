import { PRIVATE_API_SERVER_DOMAIN } from '$env/static/private';
import { error, type Load } from '@sveltejs/kit';
import httpStatusCode from 'http-status-codes';

export const load: Load = async ({ fetch, params }) => {
	const { sessionId } = params;

	const getLiveSessionEndpoint = new URL(`/sessions/live/${sessionId}`, PRIVATE_API_SERVER_DOMAIN);

	const getLiveSessionRes = await fetch(getLiveSessionEndpoint);

	if (getLiveSessionRes.status == httpStatusCode.NOT_FOUND) {
		error(httpStatusCode.NOT_FOUND, {
			status: httpStatusCode.NOT_FOUND,
			statusText: httpStatusCode.getStatusText(httpStatusCode.NOT_FOUND),
			message: 'can not find live session'
		});
	}

	const getBreakTimeEndpoint = new URL(
		`/sessions/live/${sessionId}/break_time`,
		PRIVATE_API_SERVER_DOMAIN
	);
	const getBreakTimeRes = await fetch(getBreakTimeEndpoint);

	let breakTime;

	if (getBreakTimeRes.status != httpStatusCode.NO_CONTENT) {
		breakTime = await getBreakTimeRes.json();
	}

	const body = await getLiveSessionRes.json();
	const liveSession = body.data;

	console.log(liveSession, breakTime);
	return {
		liveSession,
		breakTime
	};
};
