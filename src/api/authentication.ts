import axiosInstance from "@/configs/axios";
import { AuthenticationModel } from "@/types/models/authentication";

const END_POINT = "/auth";

const authentication = {
  async get() {
    const response = await axiosInstance.get<AuthenticationModel>(`${END_POINT}/authencated`);
    return response;
  },
};

export default authentication;
