import { useMutation } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { type UserLogin } from "../services/authServices";

export interface LoginResponse {
  access: string;
  refresh: string;
}

const useAuth = () => {
  const apiClient = new ApiClient<UserLogin>("auth/jwt/create");

  return useMutation<UserLogin, Error, UserLogin>({
    mutationFn: apiClient.save,
    onSuccess: (responseData: UserLogin) => {
      // console.log(responseData);
      if (responseData?.access)
        localStorage.setItem("access", responseData?.access);
      location.href = "/";
    },
  });
};
export default useAuth;
