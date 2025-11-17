import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";

const useSupplier = <StaffList>(id: number) => {
  const apiClient = new ApiClient<StaffList>("ladyfish/suppliers/" + id);
  return useQuery<StaffList>({
    queryFn: () => {
      return apiClient.getAllSimple({});
    },
    queryKey: ["suppliers", id],
  });
};

export default useSupplier;
