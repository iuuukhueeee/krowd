import axios from "axios";

import { BASE_API_URL } from "@/configs/env";
import { onRequest, onRequestError } from "@/configs/interceptors";
import getIdToken from "@/utils/getIdToken";

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: getIdToken(),
  },
});

axiosInstance.interceptors.request.use(onRequest, onRequestError);

export default axiosInstance;
