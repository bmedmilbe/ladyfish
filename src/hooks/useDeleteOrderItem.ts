import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import type { Order, OrderItem } from "./useOrderBySuppliers";

const useDeleteOrderItem = (order: Order | undefined) => {
  const client = new ApiClient<Order>(
    "ladyfish/orders/" + order?.id + "/orderitems"
  );
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: OrderItem) => client.delete(data?.id || 0),
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries([
          "suppliers",
          order?.supplier.id,
          "ordersbysupplier",
          order?.id,
        ]),
      ]);
    },
  });
};

export default useDeleteOrderItem;
