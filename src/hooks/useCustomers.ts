import { useQuery } from "@tanstack/react-query";
import ApiClient, { type ResponseA } from "../services/api-client";

export interface Customer {
  id: number;
  user: number;
  first_name: string;
  last_name: string;
  boss: boolean;
  is_deliver: boolean;
  phone: number;
}
interface QueryParams {}

const useCustomers = <Customer>(query_params: QueryParams) => {
  const apiClient = new ApiClient<Customer>("ladyfish/customers");
  console.log(query_params);
  return useQuery<ResponseA<Customer>>({
    queryFn: () => {
      return apiClient.getAllSecond({
        params: {
          ...query_params,
          limit: 100,
        },
      });
    },
    queryKey: ["customers", query_params],
  });
};

export default useCustomers;
