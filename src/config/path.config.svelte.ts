import { PUBLIC_MEDIA_STATIC_SERVER_DOMAIN } from '$env/static/public';

export const to = {
	mediaServer: {
		staticServer: {
			video: new URL('media/video/', PUBLIC_MEDIA_STATIC_SERVER_DOMAIN).href
		}
	}
};
