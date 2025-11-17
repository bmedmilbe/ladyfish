import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "../../services/api-client";
import type { Supplier } from "../useGroupMembers";

const useDeleteSupplier = (supplier: Supplier | undefined) => {
  const apiClient = new ApiClient<Supplier>("ladyfish/suppliers");
  const queryClient = useQueryClient();

  return useMutation<Supplier, Error, Supplier>({
    mutationFn: () => apiClient.delete(supplier?.id || 0),

    onSuccess: () => {
      // Invalidate the cache
      // console.log(data);

      Promise.all([queryClient.invalidateQueries(["suppliers"])]);
    },
  });
};

export default useDeleteSupplier;
