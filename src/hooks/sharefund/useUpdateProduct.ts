import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../../services/api-client";
import type { Product, ProductForUpdate } from "../ground/products/useProducts";

const useUpdateProduct = (product: Product | undefined) => {
  const apiClient = new ApiClient<ProductForUpdate>(
    "ladyfish/products/" + product?.id
  );
  const queryClient = useQueryClient();

  return useMutation<ProductForUpdate, Error, ProductForUpdate>({
    mutationFn: apiClient.updatePart,

    onSuccess: () => {
      // Invalidate the cache
      // console.log(data);

      Promise.all([queryClient.invalidateQueries(["products", product?.id])]);
    },
  });
};

export default useUpdateProduct;
