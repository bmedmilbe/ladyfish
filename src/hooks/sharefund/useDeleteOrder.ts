import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../../services/api-client";
import type { Order } from "../useOrderBySuppliers";

const useDeleteOrder = (order: Order | undefined) => {
  const apiClient = new ApiClient<Order>("ladyfish/orders");
  const queryClient = useQueryClient();

  return useMutation<Order, Error, Order>({
    mutationFn: () => apiClient.delete(order?.id || 0),

    onSuccess: () => {
      // Invalidate the cache
      // console.log(data);

      Promise.all([
        queryClient.invalidateQueries(["suppliers", order?.supplier.id]),
      ]);
    },
  });
};

export default useDeleteOrder;
