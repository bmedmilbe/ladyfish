import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../../services/api-client";
import type { Order } from "../useOrderBySuppliers";

const useUpdateOrderPayment = (order: Order | undefined) => {
  const apiClient = new ApiClient<Order>("ladyfish/orders/" + order?.id);
  const queryClient = useQueryClient();

  return useMutation<Order, Error, Order>({
    mutationFn: apiClient.updatePart,

    onSuccess: () => {
      // Invalidate the cache
      // console.log(data);

      Promise.all([
        queryClient.invalidateQueries(["suppliers", order?.supplier.id]),
      ]);
    },
  });
};

export default useUpdateOrderPayment;
