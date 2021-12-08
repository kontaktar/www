export { useUser as default } from "providers/AuthorizedUser";
// import useSWR from "swr";
// import { Endpoint, UserSessionStorage } from "types";

// // Fetches information about the user from the iron-session storage.

// export default function useUser(): {
//   user: UserSessionStorage;
//   mutateUser: (data?: UserSessionStorage, shouldRevalidate?: boolean) => void;
// } {
//   console.log("useSwr USER");
//   const { data: user, mutate: mutateUser } = useSWR(Endpoint.User);

//   if (!user) {
//     return { user: { isLoggedIn: false }, mutateUser };
//   }
//   return { user, mutateUser };
// }
