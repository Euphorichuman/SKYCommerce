/** Products */

export type Product = {
  productIdentifier: string;
  description: string;
  unitValue: string;
  statusProduct: string;
};

export const defaultProduct: Product = {
  productIdentifier: "",
  description: "",
  unitValue: "",
  statusProduct: "Disponible",
};


/** Sales */
export type Sale = {
  soldProductIdentifier: string;
  saleIdentifier: string;
  saleDate: string;
  idClient: string;
  nameClient: string;
  totalValue: string;
  quantity: string;
  unitValueProduct: string;
  statusSale: string;
};

export const defaultSale: Sale = {
  soldProductIdentifier: "",
  saleIdentifier: "",
  saleDate: "",
  idClient: "",
  nameClient: "",
  totalValue: "",
  quantity: "",
  unitValueProduct: "",
  statusSale: "En proceso",
};


