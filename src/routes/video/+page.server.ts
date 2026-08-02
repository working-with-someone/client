import type { PageServerLoad } from '../$types';
import { PRIVATE_API_SERVER_DOMAIN } from '$env/static/private';
import type { PublicPreferredCategory } from '../../types/api-contracts/category';
import type { PublicVideoSession } from '../../types/api-contracts/video-session';

export const load: PageServerLoad = async ({ locals, fetch }) => {
	const getPCategoriesEndpointUrl = new URL(
		`/users/${locals.userId}/preferred-categories`,
		PRIVATE_API_SERVER_DOMAIN
	);

	const getPCategoriesRes = await fetch(getPCategoriesEndpointUrl);

	const pCategories = (await getPCategoriesRes.json()).data as PublicPreferredCategory[];

	const pCategorizedVideoSessionsList = new Map<string, PublicVideoSession[]>();

	for (const pCategory of pCategories) {
		const getVideoSessionsEndpointUrl = new URL(`/sessions/video`, PRIVATE_API_SERVER_DOMAIN);
		getVideoSessionsEndpointUrl.searchParams.set('category', pCategory.category_label);
		getVideoSessionsEndpointUrl.searchParams.set('page', '1');
		getVideoSessionsEndpointUrl.searchParams.set('per_page', '10');

		const getVideoSessionsRes = await fetch(getVideoSessionsEndpointUrl);

		const videoSessions = (await getVideoSessionsRes.json()).data as PublicVideoSession[];

		pCategorizedVideoSessionsList.set(pCategory.category_label, videoSessions);
	}

	return { pCategorizedVideoSessionsList };
};
