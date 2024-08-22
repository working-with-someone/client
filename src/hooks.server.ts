import type { Handle, HandleFetch } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    return await resolve(event);
}

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
    // api server에 전송하는 fetch request라면 cookie를 포함시킨다.
    if (request.url.startsWith(import.meta.env.VITE_API_SERVER_DOMAIN)) {
        request.headers.set('cookie', event.request.headers.get('cookie') as string);
    }

    return fetch(request);
}