import { useState, useEffect, useCallback } from "react";
import { useApi } from "../providers/API";
import { Sale, defaultSale } from "./interfaces";

export const useSales = () => {
  const { GETCall, POSTCall, DELETECall, PUTCall }: any = useApi();
  const [sale, setSale] = useState<Sale>(defaultSale);
  const [sales, setSales] = useState<Sale[]>([]);
  /** Pending data in table */
  const [pending, setPending] = useState(true);
  const [onEditId, setIdEdit] = useState<String>();

  const fetchSales = useCallback(() => {
    GETCall("/sales")
      .then((data: any) => {
        setSales(data);
        setPending(false);
      })
      .catch((error: any) => console.log(error, "Error consultado las venta"));
  }, [GETCall]);

  const addSale = () => {
    POSTCall("/sales/add", sale)
      .then((data: any) => {
        setSales(data);
        setPending(false);
      })
      .catch((error: any) => console.log(error, "Error agregando la venta"));
  };

  const udpateSale = (id: string) => {
    PUTCall(`/sales/update/${id}`, sale)
      .then((data: any) => {
        setSale(defaultSale);
        setSales(data);
      })
      .catch((error: any) =>
        console.log(error, "Error actualizando la venta")
      );
  };

  const deleteSale = (id: string) => {
    DELETECall(`/sales/remove/${id}`)
      .then((data: any) => {
        setSales(data);
      })
      .catch((error: any) => console.log(error, "Error borrando la venta"));
  };

  const saveSale = () => {
    onEditId ? udpateSale(String(onEditId)) : addSale();
  };

  /** Get products on products component is loaded */
  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  return {
    sale,
    setSale,
    sales,
    setSales,
    pending,
    setPending,
    fetchSales,
    addSale,
    udpateSale,
    deleteSale,
    onEditId,
    setIdEdit,
    saveSale,
  };
};

