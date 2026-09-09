import type { PageServerLoad } from '../$types';
import { PRIVATE_API_SERVER_DOMAIN } from '$env/static/private';
import type { PublicPreferredCategory } from '../../types/api-contracts/category';
import type { PublicVideoSession } from '../../types/api-contracts/video-session';
import type { PaginatedResult } from '../../types/pagination';

export const load: PageServerLoad = async ({ locals, fetch, url }) => {
	const search = url.searchParams.get('search')?.trim();

	const getPCategoriesEndpointUrl = new URL(
		`/users/${locals.userId}/preferred-categories`,
		PRIVATE_API_SERVER_DOMAIN
	);

	const getPCategoriesRes = await fetch(getPCategoriesEndpointUrl);

	const pCategories = (await getPCategoriesRes.json()).data as PublicPreferredCategory[];

	const pCategorizedVideoSessionsBodyList = new Map<
		string,
		PaginatedResult<PublicVideoSession[]>
	>();

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
		const categorizedVideoSessionsBody = (await getVideoSessionsRes.json()) as PaginatedResult<
			PublicVideoSession[]
		>;

		if (!categorizedVideoSessionsBody.data.length) {
			continue;
		}

		pCategorizedVideoSessionsBodyList.set(pCategory.category_label, categorizedVideoSessionsBody);
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
	const randomizedVideoSessionsBody = (await randomizedVideoSessionsRes.json()) as PaginatedResult<
		PublicVideoSession[]
	>;

	return { pCategorizedVideoSessionsBodyList, randomizedVideoSessionsBody };
};
