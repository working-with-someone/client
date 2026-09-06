import type { PageServerLoad } from '../$types';
import { PRIVATE_API_SERVER_DOMAIN } from '$env/static/private';
import type { PublicPreferredCategory } from '../../types/api-contracts/category';
import type { PublicVideoSession } from '../../types/api-contracts/video-session';

export const load: PageServerLoad = async ({ locals, fetch, url }) => {
	const search = url.searchParams.get('search')?.trim();

	const getPCategoriesEndpointUrl = new URL(
		`/users/${locals.userId}/preferred-categories`,
		PRIVATE_API_SERVER_DOMAIN
	);

	const getPCategoriesRes = await fetch(getPCategoriesEndpointUrl);

	const pCategories = (await getPCategoriesRes.json()).data as PublicPreferredCategory[];

	const pCategorizedVideoSessionsList = new Map<string, PublicVideoSession[]>();
	const randomizedVideoSessions: PublicVideoSession[] = [];

	for (const pCategory of pCategories) {
		const getCategorizedVideoSessionsEndpointUrl = new URL(
			`/sessions/video`,
			PRIVATE_API_SERVER_DOMAIN
		);

		getCategorizedVideoSessionsEndpointUrl.searchParams.set('category', pCategory.category_label);

		if (search) {
			getCategorizedVideoSessionsEndpointUrl.searchParams.set('search', search);
		}

		getCategorizedVideoSessionsEndpointUrl.searchParams.set('page', '1');
		getCategorizedVideoSessionsEndpointUrl.searchParams.set('per_page', '10');

		const getVideoSessionsRes = await fetch(getCategorizedVideoSessionsEndpointUrl);
		const categorizedVideoSessionsData = (await getVideoSessionsRes.json())
			.data as PublicVideoSession[];

		if (!categorizedVideoSessionsData.length) {
			continue;
		}

		pCategorizedVideoSessionsList.set(pCategory.category_label, categorizedVideoSessionsData);
	}

	const getRandomizedVideoSessionsEndpointUrl = new URL(
		`/sessions/video`,
		PRIVATE_API_SERVER_DOMAIN
	);

	if (search) {
		getRandomizedVideoSessionsEndpointUrl.searchParams.set('search', search);
	}

	getRandomizedVideoSessionsEndpointUrl.searchParams.set('page', '1');
	getRandomizedVideoSessionsEndpointUrl.searchParams.set('per_page', '10');
	const randomizedVideoSessionsRes = await fetch(getRandomizedVideoSessionsEndpointUrl);
	const randomizedVideoSessionsData = (await randomizedVideoSessionsRes.json())
		.data as PublicVideoSession[];

	randomizedVideoSessions.push(...randomizedVideoSessionsData);

	return { pCategorizedVideoSessionsList, randomizedVideoSessions };
};
