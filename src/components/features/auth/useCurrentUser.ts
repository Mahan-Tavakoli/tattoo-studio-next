import { getMeApi } from "@/components/services/authService";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function useCurrentUser() {
  const [token, setToken] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setToken((getCookie("access_token") as string) || null);
    setMounted(true);
  }, []);

  const {
    data,
    isLoading,
    isError: currentUserIsError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getMeApi,
    retry: false,
    enabled: !!token,
    staleTime: Infinity
  });

  const currentUserIsLoading = !mounted || isLoading

  const user = data ?? null;

  return { user, currentUserIsError, currentUserIsLoading };
}
