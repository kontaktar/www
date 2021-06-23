import useSWR from "swr";
import { Endpoint } from "types";

// Fetches information about the user from the iron-session storage.

export default function useUser(): any {
  const { data: user, mutate: mutateUser } = useSWR(Endpoint.User);

  return { user, mutateUser };
}
