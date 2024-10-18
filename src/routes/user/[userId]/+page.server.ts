import { PUBLIC_API_SERVER_DOMAIN } from "$env/static/public";
import type { Load } from "@sveltejs/kit";

export const load: Load = async ({fetch, params}) => {
  const getUserEndpoint = new URL(`/users/${params.userId}`, PUBLIC_API_SERVER_DOMAIN);

  const res = await fetch(getUserEndpoint);

  const targetUser = await res.json();

  return {
    targetUser
    
  };
};
