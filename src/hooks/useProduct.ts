import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";

const useProduct = <Product>(id: number) => {
  const apiClient = new ApiClient<Product>("ladyfish/products/" + id);
  return useQuery<Product>({
    queryFn: () => {
      return apiClient.getAllSimple({});
    },
    queryKey: ["products", id],
  });
};

export default useProduct;
