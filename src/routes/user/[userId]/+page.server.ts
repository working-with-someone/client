import { PUBLIC_API_SERVER_DOMAIN } from "$env/static/public";
import type { Load } from "@sveltejs/kit";
import { error } from '@sveltejs/kit';

export const load: Load = async ({fetch, params}) => {
  const getUserEndpoint = new URL(`/users/${params.userId}`, PUBLIC_API_SERVER_DOMAIN);

  const res = await fetch(getUserEndpoint);

  const targetUser = await res.json();

  if(targetUser.status == 404){
		error(404, {
			message: '사용자를 찾을 수 없습니다',
		});
  }

  return {
    targetUser
  };
};
