import React, { Fragment } from "react";
import { useProducts } from "../../../hooks/products"; // Hooks
import "./styles/modalForm.scss";

interface IModalFormProps {
  title?: string;
  visibility: any;
  setVisibility: any;
  setIdEdit?: any;
  children: React.ReactNode;
}

export function ModalForm({
  title,
  children,
  setIdEdit,
  visibility,
  setVisibility,
}: IModalFormProps) {
  const { fetchProducts } = useProducts();
  return (
    <Fragment>
      {visibility && (
        <div className="overlay">
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between">
              <div>{title}</div>
              <div
                className="btn-close"
                onClick={() => {
                  fetchProducts();
                  setIdEdit("");
                  setVisibility(false);
                }}
              ></div>
            </div>
            <div className="card-body">{children}</div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
