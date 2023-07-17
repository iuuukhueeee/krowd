import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export const onRequest = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("id-token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

export const onRequestError = (error: AxiosError) => {
  // Do something with the request error
  return Promise.reject(error);
};

export const onResponseSuccess = (response: AxiosResponse) => {
  // Do something with the response data
  return response;
};

export const onResponseError = (error: AxiosError) => {
  // Do something with the response error
  return Promise.reject(error);
};
