import type { PageServerLoad } from '../$types';
import { PRIVATE_API_SERVER_DOMAIN } from '$env/static/private';
import type { PublicPreferredCategory } from '../../types/api-contracts/category';
import type { PublicVideoSession } from '../../types/api-contracts/video-session';
import type { PaginatedResult } from '../../types/pagination';

export const load: PageServerLoad = async ({ locals, fetch, url }) => {
	const search = url.searchParams.get('search')?.trim();
	const category = url.searchParams.get('category')?.trim();

	const pCategorizedVideoSessionsBodyList = new Map<
		string,
		PaginatedResult<PublicVideoSession[]>
	>();

	// category가 지정되면 선호 카테고리별 조회는 건너뛴다
	if (!category) {
		const getPCategoriesEndpointUrl = new URL(
			`/users/${locals.userId}/preferred-categories`,
			PRIVATE_API_SERVER_DOMAIN
		);

		const getPCategoriesRes = await fetch(getPCategoriesEndpointUrl);

		const pCategories = (await getPCategoriesRes.json()).data as PublicPreferredCategory[];

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
	}

	const getRandomizedVideoSessionsEndpointUrl = new URL(
		`/sessions/video`,
		PRIVATE_API_SERVER_DOMAIN
	);

	if (category) {
		getRandomizedVideoSessionsEndpointUrl.searchParams.set('category', category);
	}

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
