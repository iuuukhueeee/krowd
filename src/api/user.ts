import axiosInstance from "@/configs/axios";
import { UserModel } from "@/types/models/user";

const ENDPOINT = "user";

const user = {
  async getUser() {
    const response = await axiosInstance.get<UserModel>(`${ENDPOINT}`);
    return response;
  },
};

export default user;
