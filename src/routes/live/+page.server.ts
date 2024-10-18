import { PUBLIC_API_SERVER_DOMAIN } from "$env/static/public";
import type { Load } from "@sveltejs/kit";

export const load: Load = async ({fetch}) => {
  const liveStreamings = [
    {
      title : "seo의 study with me",
      thumbnail : 'https://cdn.prod.website-files.com/60babc2f4a97cece9858d8e7/61fdcbc2eba8184b4ea8b6ff_hq720.jpeg',
      time : 153,
      user_id : 211,
      user : null,
    },
    {
      title : "seungho-hub의 code with me",
      thumbnail : 'https://i.ytimg.com/vi/wJDtkILuk9Q/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCFSwRx05-jHroc8G3CfOqnl4WGRA',
      time : 153,
      user_id : 211,
      user : null,
    }
  ];

  for(let i = 0; i < liveStreamings.length; i++){
    const liveStreaming = liveStreamings[i];

    const getUserEndpointURL = new URL(`/users/${liveStreaming.user_id}`, PUBLIC_API_SERVER_DOMAIN);
    
    const res = await fetch(getUserEndpointURL);
    const body = await res.json();

    liveStreamings[i].user = body.user;

    console.log(liveStreamings[i].user);
  }
    
  

	return {
    liveStreamings
	};
};
