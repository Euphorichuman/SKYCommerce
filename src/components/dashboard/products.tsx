import React, { useState, useMemo, ChangeEvent } from "react";
import { TableColumn } from "react-data-table-component";
import { DataTableBase } from "./components/dataTableBase";
import { FilterComponent } from "./components/filterComponent";
import { CheckboxComponent } from "./components/checkboxComponent";
import { ModalForm } from "./components/modalForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import "./styles/products.scss";

type FormElement = React.FormEvent<HTMLFormElement>;

type Product = {
  id: string;
  description: string;
  price: string;
  state: string;
};

const defaultProduct: Product = {
  id: "",
  description: "",
  price: "",
  state: "Disponible",
};

export function Products(): JSX.Element {
  const columns: TableColumn<Product>[] = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Descripción",
      selector: (row) => row.description,
    },
    {
      name: "Precio c/u",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.state,
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row) => row.state === "Disponible",
          style: {
            color: "#fff",
          },
        },
      ],
    },
    {
      cell: (row) => (
        <div className="actions-container d-flex justify-content-between">
          <div className="action d-flex align-items-center justify-content-center">
            <FontAwesomeIcon
              onClick={() => modifyProduct(row.id, true)}
              id={row.id}
              className=""
              icon={faPencilAlt}
            />
          </div>
          <div className="action d-flex align-items-center justify-content-center">
            <FontAwesomeIcon
              onClick={() => removeProduct(row.id)}
              id={row.id}
              className=""
              icon={faTrashAlt}
            />
          </div>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  /** Temporal products save*/
  const [product, setProduct] = useState<Product>(defaultProduct);
  const [products, setProducts] = useState<Product[]>([]);

  /** Modal from visivility*/
  const [visibility, setVisibility] = useState(false);
  /** Pagination on filter*/
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  /** Search bar */
  const [filterText, setFilterText] = useState("");
  const filteredItems = products.filter(
    (item) =>
      item.description &&
      item.description.toLowerCase().includes(filterText.toLowerCase())
  );

  /**  Fields empty in products form*/
  const [errorMessage, setErrorMessage] = useState("");

  /** Submit product form */
  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();

    const isValid =
      product.id && product.description && product.price && product.state;
    const errorMessage = !isValid
      ? "Por favor, ingrese todos los datos del producto"
      : "";
    setErrorMessage(errorMessage);

    if (isValid) {
      setProducts([...products, product]);
      setProduct(defaultProduct);
      setVisibility(false);
    }
  };

  /** Changes in form products form*/
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    key: string
  ): void => {
    setErrorMessage("");
    setProduct({
      ...product,
      [key]: e.target.value,
    });
  };

  const modifyProduct = (id: number | string, isEdit: boolean): void => {
    if (isEdit) {
      const productModifying: Product = products.find((p) => p.id === id)!;
      if (product) {
        setProduct(productModifying);
        setVisibility(true);
      }
    }

    setProducts(products.filter((p) => p.id !== id));
  };

  const removeProduct = (id: number | string): void => {
    setProducts(products.filter((p) => p.id !== id));
  };

  /** Pagination on filter*/
  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e: any) => setFilterText(e.target.value)}
        onClear={handleClear}
        setVisibility={setVisibility}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div className="products d-flex flex-column">
      <div className="table-wrapper">
        <DataTableBase
          title="Productos"
          columns={columns}
          data={filteredItems}
          subHeaderComponent={subHeaderComponentMemo}
          selectableRowsComponent={CheckboxComponent}
        />
      </div>
      <ModalForm
        title={"Agregar productos"}
        visibility={visibility}
        setVisibility={setVisibility}
      >
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label htmlFor="inputId" className="form-label">
              Identificador
            </label>
            <input
              type="text"
              onChange={(e) => handleChange(e, "id")}
              value={product.id}
              className="form-control rounded-pill"
              id="inputId"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputState" className="form-label">
              Estado
            </label>
            <select
              onChange={(e) => handleChange(e, "state")}
              value={product.state}
              id="inputState"
              className="form-select rounded-pill"
            >
              <option defaultValue="Disponible">Disponible</option>
              <option value="No disponible">No disponible</option>
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputDescription" className="form-label">
              Descripción
            </label>
            <input
              type="text"
              onChange={(e) => handleChange(e, "description")}
              value={product.description}
              className="form-control rounded-pill"
              id="inputDescription"
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputValue" className="form-label">
              Valor (c/u)
            </label>
            <input
              type="text"
              onChange={(e) => handleChange(e, "price")}
              value={product.price}
              className="form-control rounded-pill"
              id="inputValue"
            />
          </div>
          <span>{errorMessage}</span>
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary rounded-pill color-in"
            >
              Agregar producto
            </button>
          </div>
        </form>
      </ModalForm>
    </div>
  );
}
