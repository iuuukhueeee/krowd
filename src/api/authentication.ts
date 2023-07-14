import axiosInstance from "@/configs/axios";
import { AuthenticationModel } from "@/types/models/authentication";

const authentication = {
  async get() {
    const response = await axiosInstance.get<AuthenticationModel>(`authenticate`);
    return response;
  },
};

export default authentication;
