import { useState, useEffect, useCallback } from "react";
import { useApi } from "../providers/API";
import { Product, defaultProduct } from "./interfaces";

export const useProducts = () => {
  const { GETCall, POSTCall, DELETECall, PUTCall }: any = useApi();
  const [product, setProduct] = useState<Product>(defaultProduct);
  const [products, setProducts] = useState<Product[]>([]);
  /** Pending data in table */
  const [pending, setPending] = useState(true);
  const [onEditId, setIdEdit] = useState<String>();

  const fetchProducts = useCallback(() => {
    GETCall("/products")
      .then((data: any) => {
        setProducts(data);
        setPending(false);
      })
      .catch((error: any) => console.log(error, "Error consultado productos"));
  }, [GETCall]);

  const addProduct = () => {
    POSTCall("/products/add", product)
      .then((data: any) => {
        setProducts(data);
        setPending(false);
      })
      .catch((error: any) => console.log(error, "Error agregando productos"));
  };

  const udpateProduct = (id: string) => {
    PUTCall(`/products/update/${id}`, product)
      .then((data: any) => {
        setProduct(defaultProduct);
        setProducts(data);
      })
      .catch((error: any) =>
        console.log(error, "Error actualizando el producto")
      );
  };

  const deleteProduct = (id: string) => {
    DELETECall(`/products/remove/${id}`)
      .then((data: any) => {
        setProducts(data);
      })
      .catch((error: any) => console.log(error, "Error borrando el producto"));
  };

  const saveProduct = () => {
    onEditId ? udpateProduct(String(onEditId)) : addProduct();
  };

  /** Get products on products component is loaded */
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    product,
    setProduct,
    products,
    setProducts,
    pending,
    setPending,
    fetchProducts,
    addProduct,
    udpateProduct,
    deleteProduct,
    onEditId,
    setIdEdit,
    saveProduct,
  };
};
