import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../../services/api-client";
import type { Product } from "../ground/products/useProducts";

const useDeleteProduct = (product: Product | undefined) => {
  const apiClient = new ApiClient<Product>("ladyfish/products");
  const queryClient = useQueryClient();

  return useMutation<Product, Error, Product>({
    mutationFn: () => apiClient.delete(product?.id || 0),

    onSuccess: () => {
      // Invalidate the cache
      // console.log(data);

      Promise.all([queryClient.invalidateQueries(["products"])]);
    },
  });
};

export default useDeleteProduct;
