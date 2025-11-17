import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../../../services/api-client";
import type { Product } from "./useProducts";

const useAddProduct = () => {
  const apiClient = new ApiClient<Product>(`ladyfish/products`);
  const queryClient = useQueryClient();

  return useMutation<Product, Error, Product>({
    mutationFn: apiClient.save,

    onSuccess: () => {
      // Invalidate the cache
      // console.log(data);
      Promise.all([queryClient.invalidateQueries(["products"])]);
    },
  });
};

export default useAddProduct;
