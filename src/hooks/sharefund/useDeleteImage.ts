import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../../services/api-client";
import type { Order } from "../useOrderBySuppliers";

const useDeleteImage = (
  order: Order | undefined,
  endpoint: string,
  id: number
) => {
  const apiClient = new ApiClient<Order>(
    `ladyfish/orders/${order?.id}/${endpoint}`
  );
  const queryClient = useQueryClient();

  return useMutation<Order, Error, Order>({
    mutationFn: () => apiClient.delete(id),

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

export default useDeleteImage;
