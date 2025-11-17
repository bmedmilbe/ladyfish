import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../../services/api-client";
import type { Order, OrderItem } from "../useOrderBySuppliers";

const useAddOrderItem = (order: Order | undefined) => {
  const apiClient = new ApiClient<OrderItem>(
    "ladyfish/orders/" + order?.id + "/orderitems"
  );
  const queryClient = useQueryClient();

  return useMutation<OrderItem, Error, OrderItem>({
    mutationFn: apiClient.save,

    onSuccess: () => {
      // Invalidate the cache
      // console.log(data);

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

export default useAddOrderItem;
