import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import cookie from "./getCookie";
import jwt from "./jwt";
const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/`,
  timeout: 500000,
  headers: {
    "X-CSRFToken": cookie,
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: jwt ? `JWT ${jwt}` : undefined,
    credentials: "include",
  },
});

export interface ResponseA<T> {
  next: string;
  previous: string;
  count: number;
  results: T[];
}

// type addId = T | addId;
class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint + "/";
  }
  getAll = (params: AxiosRequestConfig) => {
    return instance
      .get<ResponseA<T>>(this.endpoint, params)
      .then((res) => res.data.results);
  };
  getAllSimple = (params: AxiosRequestConfig) => {
    return instance.get<T>(this.endpoint, params).then((res) => res.data);
  };
  getAllSecond = (params: AxiosRequestConfig) => {
    return instance
      .get<ResponseA<T>>(this.endpoint, params)
      .then((res) => res.data);
  };
  save = (data: T) => {
    return instance.post<T>(this.endpoint, data).then((res) => res.data);
  };
  update = (data: T) => {
    return instance.put<T>(this.endpoint, data).then((res) => res.data);
  };
  updatePart = (data: T) => {
    return instance.patch<T>(this.endpoint, data).then((res) => res.data);
  };
  // setFriend = (id: number, data: T) => {
  //   return instance
  //     .patch<T>(this.endpoint + `${id}/set_friend/`, data)
  //     .then((res) => res.data);
  // };
  setFriend = (id: number, data: T) => {
    return instance
      .patch<T>(this.endpoint + `${id}/set_friend/`, data)
      .then((res) => res.data);
  };
  completeTransaction = (id: number) => {
    return instance
      .patch<T>(this.endpoint + `${id}/complete/`)
      .then((res) => res.data);
  };
  deleteTransaction = (id: number) => {
    return instance
      .delete<T>(this.endpoint + `${id}/delete/`)
      .then((res) => res.data);
  };
  delete = (id: number) => {
    return instance.delete<T>(this.endpoint + `${id}/`).then((res) => res.data);
  };
  saveImage = (data: T) => {
    return instance
      .post<T>(this.endpoint, data, {
        headers: {
          "X-CSRFToken": cookie,
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          authorization: jwt ? `JWT ${jwt}` : undefined,
          credentials: "include",
        },
      })
      .then((res) => res.data);
  };
}

export default ApiClient;
