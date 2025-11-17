import { useQuery } from "@tanstack/react-query";
import ApiClient from "../../services/api-client";

const useGroundGeneralAll = <T>(endpoint: string, queryKey: string) => {
  const apiClient = new ApiClient<T>(`ladyfish/${endpoint}`);
  return useQuery({
    queryFn: apiClient.getAll,
    queryKey: [queryKey],
  });
};

export default useGroundGeneralAll;
