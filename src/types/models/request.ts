import { AxiosError } from "axios";

export interface Request {
  fetching: boolean;
  error?: AxiosError;
}
