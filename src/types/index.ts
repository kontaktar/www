export * from "./endpoints";
export * from "./users";
export * from "./routes";

export type UserSessionStorage = {
  login: string;
  isLoggedIn: boolean;
  id: string;
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
  Name = "userSession"
}

export enum SessionStorage {
  UserId = "userId"
}
