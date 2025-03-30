import type { Load } from "@sveltejs/kit";
import type { CategorizedSessions } from "../types/session";

export const load: Load = async () => {
  // must be replacing to fetched data
  const categorizedSessionsList: CategorizedSessions[] = [
    {
      category: "study",
      sessions: [{
        title: "seo의 study with me",
        thumbnail: 'https://cdn.prod.website-files.com/60babc2f4a97cece9858d8e7/61fdcbc2eba8184b4ea8b6ff_hq720.jpeg',
        time: 230,
        isLive: true,
        user: {
          id: 5,
          username: "minjung",
          pfp: {
            curr: "https://d1telmomo28umc.cloudfront.net/media/public/avatars/serranoarevalo-1679363190.jpg",
          }
        },
      },
      {
        title: "3-HOUR STUDY WITH ME 🏙 / calm lofi / Tokyo at Sunset / with countdown+alarm",
        thumbnail: 'https://i.ytimg.com/vi/x0qcqPcEfoc/maxresdefault.jpg',
        time: 153,
        isLive: false,
        user: {
          id: 5,
          username: "minjung",
          pfp: {
            curr: "https://d1telmomo28umc.cloudfront.net/media/public/avatars/serranoarevalo-1679363190.jpg",

          }
        },
      },
      {
        title: "Study With Me Live Stream",
        thumbnail: "https://i.ytimg.com/vi/Lru7Hpe32V4/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLD2ZojtN4ouIi9ReJ0oGtbkarzJoA",
        time: 98,
        isLive: false,
        user: {
          id: 5,
          username: "minjung",
          pfp: {
            curr: "https://d1telmomo28umc.cloudfront.net/media/public/avatars/serranoarevalo-1679363190.jpg",

          }
        },
      },
      {
        title: "Study with Korean law student for 2 hours! [Study with me]",
        thumbnail: "https://i.ytimg.com/vi/ms-Tr0GbVAY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB0p28HQSw32tAq4nv2uKq-VUI43w",
        time: 98,
        isLive: false,
        user: {
          id: 5,
          username: "minjung",
          pfp: {
            curr: "https://d1telmomo28umc.cloudfront.net/media/public/avatars/serranoarevalo-1679363190.jpg",

          }
        },
      },
      {
        title: "seo의 study with me",
        thumbnail: 'https://cdn.prod.website-files.com/60babc2f4a97cece9858d8e7/61fdcbc2eba8184b4ea8b6ff_hq720.jpeg',
        time: 230,
        isLive: false,
        user: {
          id: 5,
          username: "minjung",
          pfp: {
            curr: "https://d1telmomo28umc.cloudfront.net/media/public/avatars/serranoarevalo-1679363190.jpg",
          }
        },
      },
      {
        title: "seo의 study with me",
        thumbnail: 'https://cdn.prod.website-files.com/60babc2f4a97cece9858d8e7/61fdcbc2eba8184b4ea8b6ff_hq720.jpeg',
        time: 230,
        isLive: false,
        user: {
          id: 5,
          username: "minjung",
          pfp: {
            curr: "https://d1telmomo28umc.cloudfront.net/media/public/avatars/serranoarevalo-1679363190.jpg",
          }
        },
      },
      ]
    },
    {
      category: "read",
      sessions: [{
        title: "seo의 study with me",
        thumbnail: 'https://i.ytimg.com/vi/_Fc7_1mPt6c/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAfGKd7h7x5A-3oGRpnJC_UnkyvZw',
        time: 230,
        isLive: true,
        user: {
          id: 5,
          username: "minjung",
          pfp: {
            curr: "https://d1telmomo28umc.cloudfront.net/media/public/avatars/serranoarevalo-1679363190.jpg",
          }
        },
      },
      {
        title: "개방장의 read me with me",
        thumbnail: 'https://i.ytimg.com/vi/WVInz6L8aQk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDQyPBcBonCjsZz3mHR2sOia5nAQA',
        time: 153,
        isLive: true,
        user: {
          id: 5,
          username: "minjung",
          pfp: {
            curr: "https://d1telmomo28umc.cloudfront.net/media/public/avatars/serranoarevalo-1679363190.jpg",

          }
        },
      },
      {
        title: "emily와 함께 코딩할사람 모여라~",
        thumbnail: "https://i.ytimg.com/vi/4mcYMuBoMns/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA7yNNz_XLSH4pCy1k55UutoXZu3g",
        time: 98,
        isLive: false,
        user: {
          id: 5,
          username: "minjung",
          pfp: {
            curr: "https://d1telmomo28umc.cloudfront.net/media/public/avatars/serranoarevalo-1679363190.jpg",

          }
        },
      },
      {
        title: "Play this While You Read (Read With Me 📚 30 Minutes)",
        thumbnail: "https://i.ytimg.com/vi/3--F5Uo5HX0/maxresdefault.jpg",
        time: 98,
        isLive: false,
        user: {
          id: 5,
          username: "minjung",
          pfp: {
            curr: "https://d1telmomo28umc.cloudfront.net/media/public/avatars/serranoarevalo-1679363190.jpg",

          }
        },
      }
      ]
    },
    {
      category: "training",
      sessions: [{
        title: "seo의 code with me",
        thumbnail: 'https://i.ytimg.com/vi/Joq3z0lxbQc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCWr09Rur5TOvcgR5n3spx1Cb30ng',
        time: 230,
        isLive: false,
        user: {
          id: 5,
          username: "minjung",
          pfp: {
            curr: "https://d1telmomo28umc.cloudfront.net/media/public/avatars/serranoarevalo-1679363190.jpg",
          }
        },
      },
      {
        title: "seungho-hub의 code with me",
        thumbnail: 'https://i.ytimg.com/vi/wJDtkILuk9Q/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCFSwRx05-jHroc8G3CfOqnl4WGRA',
        time: 153,
        isLive: false,
        user: {
          id: 5,
          username: "minjung",
          pfp: {
            curr: "https://d1telmomo28umc.cloudfront.net/media/public/avatars/serranoarevalo-1679363190.jpg",

          }
        },
      },
      {
        title: "emily와 함께 코딩할사람 모여라~",
        thumbnail: "https://i.ytimg.com/vi/F3MBsDvMLc4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB8I4UfRH4bO-CeIoBK-4JSLCTacw",
        time: 98,
        isLive: false,
        user: {
          id: 5,
          username: "minjung",
          pfp: {
            curr: "https://d1telmomo28umc.cloudfront.net/media/public/avatars/serranoarevalo-1679363190.jpg",

          }
        },
      },
      {
        title: "Study and Code With Me (55 min) - No Music / College Student / Mechanical Keyboard",
        thumbnail: "https://i.ytimg.com/vi/eilhBUcNhD0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDFSRMbxPo6-81yvAt7wi3-eZmo7Q",
        time: 98,
        isLive: false,
        user: {
          id: 5,
          username: "minjung",
          pfp: {
            curr: "https://d1telmomo28umc.cloudfront.net/media/public/avatars/serranoarevalo-1679363190.jpg",

          }
        },
      },
      {
        title: "2-Hour Code and study with me - Relaxing music 🎧 - 35/5 Pomodoro",
        thumbnail: 'https://i.ytimg.com/vi/RPxmnIHrJBU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCEXdHOObszpSJeC2xOX8lIBrwXjg',
        time: 230,
        isLive: false,
        user: {
          id: 5,
          username: "minjung",
          pfp: {
            curr: "https://d1telmomo28umc.cloudfront.net/media/public/avatars/serranoarevalo-1679363190.jpg",
          }
        },
      },
      {
        title: "seo의 code with me",
        thumbnail: 'https://i.ytimg.com/vi/Joq3z0lxbQc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCWr09Rur5TOvcgR5n3spx1Cb30ng',
        time: 230,
        isLive: false,
        user: {
          id: 5,
          username: "minjung",
          pfp: {
            curr: "https://d1telmomo28umc.cloudfront.net/media/public/avatars/serranoarevalo-1679363190.jpg",
          }
        },
      },
      ]
    },
    {
      category: "study",
      sessions: [{
        title: "seo의 study with me",
        thumbnail: 'https://cdn.prod.website-files.com/60babc2f4a97cece9858d8e7/61fdcbc2eba8184b4ea8b6ff_hq720.jpeg',
        time: 230,
        isLive: true,
        user: {
          id: 5,
          username: "minjung",
          pfp: {
            curr: "https://d1telmomo28umc.cloudfront.net/media/public/avatars/serranoarevalo-1679363190.jpg",
          }
        },
      },
      {
        title: "3-HOUR STUDY WITH ME 🏙 / calm lofi / Tokyo at Sunset / with countdown+alarm",
        thumbnail: 'https://i.ytimg.com/vi/x0qcqPcEfoc/maxresdefault.jpg',
        time: 153,
        isLive: false,
        user: {
          id: 5,
          username: "minjung",
          pfp: {
            curr: "https://d1telmomo28umc.cloudfront.net/media/public/avatars/serranoarevalo-1679363190.jpg",

          }
        },
      },
      {
        title: "Study With Me Live Stream",
        thumbnail: "https://i.ytimg.com/vi/Lru7Hpe32V4/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLD2ZojtN4ouIi9ReJ0oGtbkarzJoA",
        time: 98,
        isLive: false,
        user: {
          id: 5,
          username: "minjung",
          pfp: {
            curr: "https://d1telmomo28umc.cloudfront.net/media/public/avatars/serranoarevalo-1679363190.jpg",

          }
        },
      },
      {
        title: "Study with Korean law student for 2 hours! [Study with me]",
        thumbnail: "https://i.ytimg.com/vi/ms-Tr0GbVAY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB0p28HQSw32tAq4nv2uKq-VUI43w",
        time: 98,
        isLive: false,
        user: {
          id: 5,
          username: "minjung",
          pfp: {
            curr: "https://d1telmomo28umc.cloudfront.net/media/public/avatars/serranoarevalo-1679363190.jpg",

          }
        },
      },
      {
        title: "seo의 study with me",
        thumbnail: 'https://cdn.prod.website-files.com/60babc2f4a97cece9858d8e7/61fdcbc2eba8184b4ea8b6ff_hq720.jpeg',
        time: 230,
        isLive: false,
        user: {
          id: 5,
          username: "minjung",
          pfp: {
            curr: "https://d1telmomo28umc.cloudfront.net/media/public/avatars/serranoarevalo-1679363190.jpg",
          }
        },
      },
      {
        title: "seo의 study with me",
        thumbnail: 'https://cdn.prod.website-files.com/60babc2f4a97cece9858d8e7/61fdcbc2eba8184b4ea8b6ff_hq720.jpeg',
        time: 230,
        isLive: false,
        user: {
          id: 5,
          username: "minjung",
          pfp: {
            curr: "https://d1telmomo28umc.cloudfront.net/media/public/avatars/serranoarevalo-1679363190.jpg",
          }
        },
      },
      ]
    },
  ];


  return {
    categorizedSessionsList
  };
};
