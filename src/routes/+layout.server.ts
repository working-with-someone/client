import { PUBLIC_API_SERVER_DOMAIN, PUBLIC_AUTH_SERVER_DOMAIN, PUBLIC_CLIENT_SERVER_DOMAIN } from "$env/static/public";
import { redirect, type Load } from "@sveltejs/kit";

export const load: Load = async ({ fetch }) => {
    const getUserSelfURL = new URL('/users/self', PUBLIC_API_SERVER_DOMAIN);

    const res = await fetch(getUserSelfURL);

    const data = await res.json();

    if (res.status == 401) {
        const redirectURL = new URL('/', PUBLIC_CLIENT_SERVER_DOMAIN);
        const loginURL = new URL("/auth/login", PUBLIC_AUTH_SERVER_DOMAIN);
        loginURL.searchParams.append("continue", redirectURL.toString());

        redirect(302, loginURL);
    }

    return { user: data };
};