import type { Handle, HandleFetch } from '@sveltejs/kit';
import { PUBLIC_API_SERVER_DOMAIN, PUBLIC_AUTH_SERVER_DOMAIN, PUBLIC_CLIENT_SERVER_DOMAIN } from '$env/static/public';
import { redirect } from '@sveltejs/kit';

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
    // api server에 전송하는 fetch request라면 cookie를 포함시킨다.
    if (request.url.startsWith(PUBLIC_API_SERVER_DOMAIN)) {
        request.headers.set('cookie', event.request.headers.get('cookie') as string);
    }
    
    const res = await fetch(request);

    if(res.status == 401){
        const redirectURL = new URL('/', PUBLIC_CLIENT_SERVER_DOMAIN);
        const loginURL = new URL("/auth/login", PUBLIC_AUTH_SERVER_DOMAIN);
        loginURL.searchParams.append("continue", redirectURL.toString());

        redirect(302, loginURL);
    }

    return res;
}

export const handle: Handle = async ({ event, resolve }) => {
    const getSelfEndpoint = new URL('/users/self', PUBLIC_API_SERVER_DOMAIN);
    const getSelfRes = await event.fetch(getSelfEndpoint)

    const userSelf = await getSelfRes.json();

    event.locals.userId = userSelf.id;

    return await resolve(event);
}