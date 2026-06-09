import AdminSignInApi, { logoutApi } from "@/components/services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { setCookie, deleteCookie } from "cookies-next";

export default function useAuth() {
  const queryClient = useQueryClient();

  // Sign In

  const { isPending, mutateAsync: signIn } = useMutation({
    mutationFn: AdminSignInApi,
    onSuccess: (data) => {
      setCookie("access_token", data?.accessToken);

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      toast.success("Welcome back Admin!");
    },

    onError: (error: AxiosError) => {
      const status = error?.response?.status;
      if (status === 400) {
        toast.error("Invalid information");
      } else if (status === 401) {
        toast.error("Email or password is incorrect");
      } else if (status === 404) {
        toast.error("There is no acoount");
      } else {
        toast.error("Your attempt to login is failed, try again later");
      }
    },
  });

  // Logout

  const { isPending: logoutIsPending, mutate: logout } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      deleteCookie("access_token");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("Logged out successfully.");
    },

    onError: () => {
      toast.error("There is an issue with your request, try again later.");
    },
  });

  return { isPending, signIn, logout, logoutIsPending };
}
