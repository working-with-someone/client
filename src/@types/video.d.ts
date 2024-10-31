import type { PublicUserInfo } from "./user";

export interface Session {
  title : string;
  thumbnail : string;
  time : number;
  user : PublicUserInfo
}

export interface LiveSession extends Session {
  started_at : number;
  duration : number;
  ended_at : number;
}