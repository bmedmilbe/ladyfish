import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import type { Order } from "./useOrderBySuppliers";

const useoOrderPaymentProof = (order: Order | undefined) => {
  const client = new ApiClient<FormData>(
    "/ladyfish/orders/" + order?.id + "/orderpaymentproof"
  );
  const queryClient = useQueryClient();

  return useMutation<FormData, Error, FormData>({
    mutationFn: (data: FormData) => client.saveImage(data),
    onSuccess: (data) => {
      // Invalidate the cache
      console.log(data);
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

export default useoOrderPaymentProof;
