import type { Load } from '@sveltejs/kit';
import { PRIVATE_API_SERVER_DOMAIN } from '$env/static/private';
import type { category } from '@prisma/client';
import type { LiveSession } from '../../types/session';

export const load: Load = async ({ fetch }) => {
	const getCategoriesEndpointUrl = new URL(`/categories`, PRIVATE_API_SERVER_DOMAIN);

	getCategoriesEndpointUrl.searchParams.set('sort', 'live_session_count');
	getCategoriesEndpointUrl.searchParams.set('page', '1');
	getCategoriesEndpointUrl.searchParams.set('per_page', '10');

	const getCategoriesRes = await fetch(getCategoriesEndpointUrl);

	const majorCategories = (await getCategoriesRes.json()).data as category[];

	const categorizedLiveSessionsList = new Map<string, LiveSession[]>();

	for (const category of majorCategories) {
		const getLiveSessionsEndpointUrl = new URL(`/sessions/live`, PRIVATE_API_SERVER_DOMAIN);
		getLiveSessionsEndpointUrl.searchParams.set('category', category.label);
		getLiveSessionsEndpointUrl.searchParams.set('page', '1');
		getLiveSessionsEndpointUrl.searchParams.set('per_page', '10');

		const getLiveSessionsRes = await fetch(getLiveSessionsEndpointUrl);

		const liveSessions = (await getLiveSessionsRes.json()).data as LiveSession[];

		categorizedLiveSessionsList.set(category.label, liveSessions);
	}

	return { categorizedLiveSessionsList };
};
