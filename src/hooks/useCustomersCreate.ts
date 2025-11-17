import { useMutation } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
export interface CustomerRegister {
  phone: string;
}
const useCustomersCreate = () => {
  const apiClient = new ApiClient<CustomerRegister>("ladyfish/customersc");

  return useMutation<CustomerRegister, Error, CustomerRegister>({
    mutationFn: apiClient.save,
    // onSuccess: (responseData: CustomerRegister, userLogin: UserLogin) => {
    //   // console.log(responseData);
    //   localStorage.setItem("access", responseData.access);
    // },
    onSuccess: (
      responseData: CustomerRegister,
      CustomerRegister: CustomerRegister
    ) => {
      // console.log(responseData);
      console.log(responseData);
      console.log(CustomerRegister);

      // localStorage.setItem("access", responseData.access);
      // auth.mutate(CustomerRegister);
    },
  });
};
export default useCustomersCreate;
