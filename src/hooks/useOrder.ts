import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";

const useOrder = <Order>(id: number, orderId: number) => {
  const apiClient = new ApiClient<Order>(
    "ladyfish/suppliers/" + id + "/ordersbysupplier/" + orderId
  );
  return useQuery<Order>({
    queryFn: () => {
      return apiClient.getAllSimple({});
    },
    queryKey: ["suppliers", id, "ordersbysupplier", orderId],
  });
};

export default useOrder;
