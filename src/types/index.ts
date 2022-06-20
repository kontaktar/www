import { NextApiRequest } from "next";
import { Session } from "next-iron-session";
import { User } from "types";
export * from "./endpoints";
export * from "./users";
export * from "./routes";
export * from "./database";

export type NextIronRequest = NextApiRequest & { session: Session };
export type UserSessionStorage = {
  details?: User;
  isLoggedIn: boolean;
  firebase?: {
    token?: string;
    id?: string;
  };
};

export type Card = {
  title: string;
  description: string;
  years: string;
  months: string;
  userName: string;
  experienceId: string;
};

export enum IronSession {
  UserSession = "userSession"
}

export enum SessionStorage {
  UserId = "userId"
}
