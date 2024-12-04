import type { PublicUserInfo } from "./user";

export type SessionMode = "live" | "video"

export interface Session {
  title : string;
  thumbnail : string;
  time : number;
  user : PublicUserInfo
  isLive : boolean;
}

export interface CategorizedSessions {
  category : string;
  sessions : Session[];
}

export interface LiveSession extends Session {
  started_at : number;
  duration : number;
  ended_at : number;
}