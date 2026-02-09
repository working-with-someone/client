import type { Load } from '@sveltejs/kit';
import type { CategorizedSessions, VideoSessionWithAll } from '../../types/session';
import { PRIVATE_API_SERVER_DOMAIN } from '$env/static/private';
import type { category } from '@prisma/client';

export const load: Load = async ({ fetch }) => {
	const getCategoriesEndpointUrl = new URL('/categories', PRIVATE_API_SERVER_DOMAIN);

	getCategoriesEndpointUrl.searchParams.set('sort', 'video_session_count');
	getCategoriesEndpointUrl.searchParams.set('page', '1');
	getCategoriesEndpointUrl.searchParams.set('per_page', '10');

	const getCategoriesRes = await fetch(getCategoriesEndpointUrl);

	const majorCategories = (await getCategoriesRes.json()).data as category[];

	const categorizedVideoSessionsList = new Map<string, VideoSessionWithAll[]>();

	for (const category of majorCategories) {
		const getVideoSessionsEndpointUrl = new URL(`/sessions/video`, PRIVATE_API_SERVER_DOMAIN);
		getVideoSessionsEndpointUrl.searchParams.set('category', category.label);
		getVideoSessionsEndpointUrl.searchParams.set('page', '1');
		getVideoSessionsEndpointUrl.searchParams.set('per_page', '10');

		const getVideoSessionsRes = await fetch(getVideoSessionsEndpointUrl);

		const videoSessions = (await getVideoSessionsRes.json()).data as VideoSessionWithAll[];

		categorizedVideoSessionsList.set(category.label, videoSessions);
	}

	return {
		categorizedVideoSessionsList
	};
};
