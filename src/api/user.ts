import axiosInstance from "@/configs/axios";
import { Gender } from "@/types/enums/gender";
import { UserModel } from "@/types/models/user";

const ENDPOINT = "user";

interface PutUser {
  roleId: string;
  fullName: string;
  phone: string;
  avatar: string;
  id_card: string;
  gender: Gender;
  birthdate: string;
  taxIdentification: string;
  address: string;
  bankName: string;
  bankAccount: string;
  momo: string;
}

const user = {
  async getUser() {
    const response = await axiosInstance.get<UserModel>(`${ENDPOINT}`);
    return response;
  },
  async putUser(data: PutUser) {
    const response = await axiosInstance.put(`${ENDPOINT}`, data);
    return response;
  },
};

export default user;
