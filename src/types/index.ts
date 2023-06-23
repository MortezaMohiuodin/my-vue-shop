export type Lang = {
  title: string;
  value: string;
};
export type User = {
  id: number | string | null;
  username: string;
};
export type Store = {
  id: number | string | null;
  name: string;
};
export type CartItem = {
  id: number | string;
  name: string;
  price: number;
  quntity: number;
};
export type Product = {
  id: number | string;
  name: string;
  price: number;
};
export type InvoiceItem = {
  id: number | string;
  name: string;
  count: number;
  totalPrice: number;
};

export interface Invoice {
  items: Array<InvoiceItem>;
  totalPrice: number;
}
