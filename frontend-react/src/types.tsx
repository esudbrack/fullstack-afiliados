export interface Seller {
  name: string;
  type: string;
  total: string;
  transactions: Transaction[];
}
export interface Transaction {
  id: number;
  type: string;
  transaction_date: Date;
  product_description: string;
  value: string;
}
