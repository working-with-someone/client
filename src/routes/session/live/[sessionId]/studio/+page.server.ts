import { PRIVATE_API_SERVER_DOMAIN } from '$env/static/private';
import { error, type Load } from '@sveltejs/kit';
import httpStatusCodes from 'http-status-codes';

export const load: Load = async ({ fetch, params }) => {
	const { sessionId } = params; // 'userid'는 경로 매개변수

	const getLiveSessionEndpoint = new URL(`/sessions/live/${sessionId}`, PRIVATE_API_SERVER_DOMAIN);
	const getBreakTimeEndpoint = new URL(
		`/sessions/live/${sessionId}/break_time`,
		PRIVATE_API_SERVER_DOMAIN
	);

	const getLiveSessionRes = await fetch(getLiveSessionEndpoint);
	const getBreakTimeRes = await fetch(getBreakTimeEndpoint);

	if (getLiveSessionRes.status == httpStatusCodes.NOT_FOUND) {
		error(httpStatusCodes.NOT_FOUND, {
			status: httpStatusCodes.NOT_FOUND,
			statusText: httpStatusCodes.getStatusText(httpStatusCodes.NOT_FOUND),
			message: 'can not find live session'
		});
	}
	const body = await getLiveSessionRes.json();
	const liveSession = body.data;

	let breakTime;

	if (getBreakTimeRes.status != httpStatusCodes.NO_CONTENT) {
		const body = await getBreakTimeRes.json();
		breakTime = body.data;
	}

	return {
		liveSession,
		breakTime
	};
};
