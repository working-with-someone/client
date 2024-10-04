import { redirect, type Load } from "@sveltejs/kit";

export const load: Load = async ({ fetch }) => {
    const getUserSelfURL = new URL('/users/self', import.meta.env.VITE_API_SERVER_DOMAIN);

    const res = await fetch(getUserSelfURL);

    const data = await res.json();

    if (res.status == 401) {
        const redirectURL = new URL('/', import.meta.env.VITE_CLIENT_SERVER_DOMAIN);
        const loginURL = new URL("/auth/login", import.meta.env.VITE_AUTH_SERVER_DOMAIN);
        loginURL.searchParams.append("continue", redirectURL.toString());

        redirect(302, loginURL);
    }

    return { user: data };
};