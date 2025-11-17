import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../../services/api-client";
import type { Product } from "../ground/products/useProducts";

const useUpdateProduct = (product: Product | undefined) => {
  const apiClient = new ApiClient<Product>("ladyfish/products/" + product?.id);
  const queryClient = useQueryClient();

  return useMutation<Product, Error, Product>({
    mutationFn: apiClient.updatePart,

    onSuccess: () => {
      // Invalidate the cache
      // console.log(data);

      Promise.all([queryClient.invalidateQueries(["products", product?.id])]);
    },
  });
};

export default useUpdateProduct;
