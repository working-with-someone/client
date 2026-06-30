import { goto } from '$app/navigation';

function url(url: string) {
	goto(url);
}

function user(userId: number) {
	goto(`/user/${userId}`);
}

function videoSession(videoSessionId: string) {
	goto(`/session/video/${videoSessionId}`);
}

function liveSession(liveSessionId: string) {
	goto(`/session/live/${liveSession}`);
}

function liveSessionStudio(liveSessionId: string) {
	goto(`/session/live/${liveSessionId}/studio`);
}

const moveTo = {
	url,
	user,
	videoSession,
	liveSession,
	liveSessionStudio
};

export default moveTo;
