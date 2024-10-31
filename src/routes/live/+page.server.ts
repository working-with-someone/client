import type { Load } from "@sveltejs/kit";
import type { LiveSession } from "../../@types/video";

export const load: Load = async () => {
  // must be replacing to fetched data
  const liveStreamings:LiveSession[]= [
    {
      title : "seo의 study with me",
      thumbnail : 'https://cdn.prod.website-files.com/60babc2f4a97cece9858d8e7/61fdcbc2eba8184b4ea8b6ff_hq720.jpeg',
      time : 153,
      user :{
        id : 4,
        username : "minjung",
        pfp : {
          curr : "https://d1telmomo28umc.cloudfront.net/media/public/avatars/serranoarevalo-1679363190.jpg",
        }
      },
      started_at : 1679363190,
      duration : 153,
      ended_at : 1679363190 + 123,
    },
    {
      title : "seungho-hub의 code with me",
      thumbnail : 'https://i.ytimg.com/vi/wJDtkILuk9Q/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCFSwRx05-jHroc8G3CfOqnl4WGRA',
      time : 153,
      user :{
        id : 4,
        username : "minjung",
        pfp : {
          curr : "https://d1telmomo28umc.cloudfront.net/media/public/avatars/serranoarevalo-1679363190.jpg",

        }
      },
      started_at : 1679363190,
      duration : 153,
      ended_at : 1679363190 + 123,
    },
    {
      title : "emily와 함께 코딩할사람 모여라~",
      thumbnail : "https://i.ytimg.com/vi/F3MBsDvMLc4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB8I4UfRH4bO-CeIoBK-4JSLCTacw",
      time : 153,
      user :{
        id : 4,
        username : "minjung",
        pfp : {
          curr : "https://d1telmomo28umc.cloudfront.net/media/public/avatars/serranoarevalo-1679363190.jpg",

        }
      },
      started_at : 1679363190,
      duration : 153,
      ended_at : 1679363190 + 123,
    }
  ];

	return {
    liveStreamings
	};
};
