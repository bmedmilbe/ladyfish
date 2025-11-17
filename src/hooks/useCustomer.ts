import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";

const useCustomer = <Customer>(id: number) => {
  const apiClient = new ApiClient<Customer>("ladyfish/customers/" + id);
  return useQuery<Customer>({
    queryFn: () => {
      return apiClient.getAllSimple({});
    },
    queryKey: ["customer", id],
  });
};

export default useCustomer;
