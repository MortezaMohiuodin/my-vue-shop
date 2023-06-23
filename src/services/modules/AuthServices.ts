import { AxiosResponse, AxiosError } from "axios";
import axios from "../axios";
import { User } from "@/types";
type payload = {
  username: string;
  password: string;
};
export const loginUser = async (payload: payload) => {
  try {
    const res: AxiosResponse<User> = await axios.post("login", payload);
    return Promise.resolve(res.data);
  } catch (error) {
    const err = error as AxiosError;
    return Promise.reject(err?.response?.data);
  }
};
