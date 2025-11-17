import useGroundGeneralAll from "../useGroundGeneralAll";

export interface Measure {
  id: number;
  name: string;
  title: string;
}
export interface Product {
  id: number;
  name: string;
  price: number;
  measure: Measure;
  nick_name: string;
}
export const ProductCopy = {
  id: 0,
  name: "",
  price: 10.0,
  measure: {
    id: 0,
    name: "",
    title: "",
  },
  nick_name: "",
};

export const useProducts = () =>
  useGroundGeneralAll<Product>("products", "products");
