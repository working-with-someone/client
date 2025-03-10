import { PRIVATE_API_SERVER_DOMAIN } from '$env/static/private';
import { error, type Load } from '@sveltejs/kit';
import httpStatusCodes from "http-status-codes";

export const load: Load = async ({ fetch, params }) => {
  const { sessionId } = params;  // 'userid'는 경로 매개변수

  const getLiveSessionEndpoint = new URL(`/sessions/live/${sessionId}`, PRIVATE_API_SERVER_DOMAIN);
  const getBreakTimeEndpoint = new URL(`/sessions/live/${sessionId}/break_time`, PRIVATE_API_SERVER_DOMAIN);

  const getLiveSessionRes = await fetch(getLiveSessionEndpoint);
  const getBreakTimeRes = await fetch(getBreakTimeEndpoint);


  if (getLiveSessionRes.status == 404) {
    error(404, {
      message: "can not found live session"
    })
  }

  const liveSession = await getLiveSessionRes.json();

  let breakTime;

  if (getBreakTimeRes.status != httpStatusCodes.NO_CONTENT) {
    breakTime = await getBreakTimeRes.json();
  }

  return {
    liveSession,
    breakTime
  };
};
