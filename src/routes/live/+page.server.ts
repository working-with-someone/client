import type { PageServerLoad } from '../$types';
import { PRIVATE_API_SERVER_DOMAIN } from '$env/static/private';
import { live_session_status } from '../../types/api-contracts/enums';
import type { PublicLiveSession } from '../../types/api-contracts/live-session';
import type { PublicPreferredCategory } from '../../types/api-contracts/category';

export const load: PageServerLoad = async ({ locals, fetch }) => {
	const getPCategoriesEndpointUrl = new URL(
		`/users/${locals.userId}/preferred-categories`,
		PRIVATE_API_SERVER_DOMAIN
	);

	const getPCategoriesRes = await fetch(getPCategoriesEndpointUrl);

	const pCategories = (await getPCategoriesRes.json()).data as PublicPreferredCategory[];

	const pCategorizedLiveSessionsList = new Map<string, PublicLiveSession[]>();

	for (const pCategory of pCategories) {
		const getLiveSessionsEndpointUrl = new URL(`/sessions/live`, PRIVATE_API_SERVER_DOMAIN);
		getLiveSessionsEndpointUrl.searchParams.set('category', pCategory.category_label);
		getLiveSessionsEndpointUrl.searchParams.append('status', live_session_status.OPENED);
		getLiveSessionsEndpointUrl.searchParams.append('status', live_session_status.BREAKED);
		getLiveSessionsEndpointUrl.searchParams.set('page', '1');
		getLiveSessionsEndpointUrl.searchParams.set('per_page', '10');

		const getLiveSessionsRes = await fetch(getLiveSessionsEndpointUrl);

		const liveSessions = (await getLiveSessionsRes.json()).data as PublicLiveSession[];

		pCategorizedLiveSessionsList.set(pCategory.category_label, liveSessions);
	}

	return { pCategorizedLiveSessionsList };
};
