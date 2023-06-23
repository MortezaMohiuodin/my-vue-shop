import { AxiosResponse, AxiosError } from "axios";
import axios from "../axios";
import type { Store, Product, Invoice } from "@/types";

export const fetchStores = async (id: number | string | null) => {
  try {
    const res: AxiosResponse<Store[]> = await axios.get(`/stores?userId=${id}`);
    return Promise.resolve(res.data);
  } catch (error) {
    const err = error as AxiosError;
    return Promise.reject(err?.response?.data);
  }
};
export const fetchProducts = async (storeId?: number | string | null) => {
  const query = storeId ? `?storeId=${storeId}` : "";
  try {
    const res: AxiosResponse<Product[]> = await axios.get(
      `/products?storeId=${query}`
    );
    return Promise.resolve(res.data);
  } catch (error) {
    const err = error as AxiosError;
    return Promise.reject(err?.response?.data);
  }
};
export const sendInvoice = async (payload: Invoice) => {
  try {
    const res: AxiosResponse<Invoice> = await axios.post("/invoice", payload);
    return Promise.resolve(res.data);
  } catch (error) {
    const err = error as AxiosError;
    return Promise.reject(err?.response?.data);
  }
};
