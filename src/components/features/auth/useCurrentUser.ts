import { getMeApi } from "@/components/services/authService";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

export default function useCurrentUser() {
  const token = getCookie("access_token");

  const {
    data,
    isLoading: currentUserIsLoading,
    isError: currentUserIsError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getMeApi,
    retry: false,
    enabled: !!token,
  });

  const user = data ?? null;

  return { user, currentUserIsError, currentUserIsLoading };
}
