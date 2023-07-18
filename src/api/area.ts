import axiosInstance from "@/configs/axios";
import { AreaModel } from "@/types/models/area";

const ENDPOINT = "areas";

const area = {
  async getAreas() {
    const response = await axiosInstance.get<AreaModel[]>(`${ENDPOINT}`);
    return response;
  },
};

export default area;
