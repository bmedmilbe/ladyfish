import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";

const useMe = <Customer>() => {
  const apiClient = new ApiClient<Customer>("exchange/customers/me");
  return useQuery<Customer>({
    queryFn: () => {
      return apiClient.getAllSimple({});
    },
    queryKey: ["me"],
  });
};

export default useMe;
