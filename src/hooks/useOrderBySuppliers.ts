import { useInfiniteQuery } from "@tanstack/react-query";
import ApiClient, { type ResponseA } from "../services/api-client";
import type { Supplier } from "./useGroupMembers";
import type { Product } from "./ground/products/useProducts";

export interface OrderItem {
  id: number;
  measure: string;
  product: Product;
  quantity: number;
  price: number;
  sub_total: number;
}
export interface ImageProof {
  id: number;
  payment_proof: string;
}
export interface ImageReceipt {
  id: number;
  receipt: string;
}
export interface Order {
  id: number;
  supplier: Supplier;
  created_at: string;
  inserted_at: string;
  order_paid: boolean;
  payment_proof: string;
  receipt: string;
  order_number: string;
  value_paid: number;
  total_price: number;
  balance: number;
  orderpaymentproofs: ImageProof[];
  orderreceipts: ImageReceipt[];
  orderitems: OrderItem[];
}

interface QueryParams {
  boss?: number;
  is_charge?: boolean;
  deliver?: number;
  completed?: boolean;
  completed_by?: number;
  friend?: number;
  friend_paid?: boolean;
  search?: string;
}

const useOrderBySuppliers = (query_params: QueryParams, staffId: number) => {
  const apiClient = new ApiClient<Order>(
    "ladyfish/suppliers/" + staffId + "/ordersbysupplier"
  );
  return useInfiniteQuery<ResponseA<Order>>({
    queryFn: ({ pageParam = 0 }) => {
      // console.log(pageParam);
      return apiClient.getAllSecond({
        params: {
          ...query_params,
          limit: 10,
          offset: pageParam * 10,
        },
      });
    },
    queryKey: ["ordersbysupplier", staffId],
    getNextPageParam: (lastPage, allPage) => {
      // return 3;
      // console.log(allPage.length % 10);
      //check if no next page in last page
      // console.log(lastPage);
      // return 1;
      let count = 0;
      allPage.map((p) => (count = count + p.results.length));
      return count != lastPage.count ? allPage.length : undefined;
    },
  });
};

export default useOrderBySuppliers;
