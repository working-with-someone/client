import { redirect } from "@sveltejs/kit";
import { PUBLIC_API_SERVER_DOMAIN, PUBLIC_CLIENT_SERVER_DOMAIN, PUBLIC_AUTH_SERVER_DOMAIN } from "$env/static/public";

interface Option extends RequestInit {
  baseUrl?: string;
  queryParams?: Record<string, string>;
}

async function wwsfetch(path:string, options:Option) {
  options.credentials = "include"
  
  const endPoint = new URL(
    path,
    options?.baseUrl ? options?.baseUrl : PUBLIC_API_SERVER_DOMAIN
  );

  if (options?.queryParams) {
    Object.entries(options.queryParams).forEach((entry) => {
      endPoint.searchParams.append(entry[0], entry[1]);
    });
  }

  const res = await fetch(endPoint, {
    ...options,
  });

  switch(res.status){
    case 401: {
      const redirectURL = new URL('/', PUBLIC_CLIENT_SERVER_DOMAIN);
      const loginURL = new URL("/auth/login", PUBLIC_AUTH_SERVER_DOMAIN);
      loginURL.searchParams.append("continue", redirectURL.toString());
  
      redirect(302, loginURL);
    }
    // must handle other error codes as needed
  }

  return res;
}

export default wwsfetch;