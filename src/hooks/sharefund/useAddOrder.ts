import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../../services/api-client";
import type { Order } from "../useOrderBySuppliers";

const useAddOrder = (supplierId: number) => {
  const apiClient = new ApiClient<Order>(
    "ladyfish/suppliers/" + supplierId + "/ordersbysupplier"
  );
  const queryClient = useQueryClient();

  return useMutation<Order, Error, Order>({
    mutationFn: apiClient.save,

    onSuccess: () => {
      // Invalidate the cache
      // console.log(data);
      Promise.all([queryClient.invalidateQueries(["suppliers", supplierId])]);
    },
  });
};

export default useAddOrder;
