import axiosInstance from "@/configs/axios";
import FieldModel from "@/types/models/field";

const ENDPOINT = "fields";

const field = {
  async getFields() {
    const response = await axiosInstance.get<FieldModel[]>(`${ENDPOINT}`);
    return response;
  },
};

export default field;
