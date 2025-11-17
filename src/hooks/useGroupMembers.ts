export interface Member {
  id: number;
  user: number;
  first_name: string;
  last_name: string;
  phone: number;
}

export interface Supplier {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  nick_name: string;
  balance: number;
}

export const supplierCopy = {
  id: 0,
  name: "",
  address: "",
  phone: "",
  email: "",
  nick_name: "",
  balance: 0,
};
