import React, { useState, useMemo, ChangeEvent } from "react";
import { TableColumn } from "react-data-table-component";
import { DataTableBase } from "./components/dataTableBase";
import { FilterComponent } from "./components/filterComponent";
import { CheckboxComponent } from "./components/checkboxComponent";
import { ModalForm } from "./components/modalForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { useProducts } from "../../hooks/products"; // Hooks
import { Product, defaultProduct } from "../../hooks/interfaces";
import "./styles/products.scss";

type FormElement = React.FormEvent<HTMLFormElement>;

export function Products(): JSX.Element {
  const {
    product,
    setProduct,
    products,
    pending,
    deleteProduct,
    onEditId,
    setIdEdit,
    saveProduct,
  } = useProducts();

  /** Columns of data table (react-data-table-component) */
  const columns: TableColumn<Product>[] = [
    {
      name: "Id",
      selector: (row) => row.productIdentifier,
      sortable: true,
    },
    {
      name: "Descripción",
      selector: (row) => row.description,
    },
    {
      name: "Precio c/u",
      selector: (row) => row.unitValue,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.statusProduct,
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row) => row.statusProduct === "Disponible",
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
              onClick={() => modifyProduct(row.productIdentifier, true)}
              id={row.productIdentifier}
              className=""
              icon={faPencilAlt}
            />
          </div>
          <div className="action d-flex align-items-center justify-content-center">
            <FontAwesomeIcon
              onClick={() => deleteProduct(row.productIdentifier)}
              id={row.productIdentifier}
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

  /** Modal from visivility*/
  const [visibility, setVisibility] = useState(false);
  /** Pagination on filter*/
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  /**  Fields empty in products form*/
  const [errorMessage, setErrorMessage] = useState("");
  /** Search bar */
  const [filterText, setFilterText] = useState("");
  const filteredItems = products.filter(
    (item) =>
      item.description &&
      item.description.toLowerCase().includes(filterText.toLowerCase())
  );

  /** Submit product form */
  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();

    const isValid =
      product.productIdentifier &&
      product.description &&
      product.unitValue &&
      product.statusProduct;
    const errorMessage = !isValid
      ? "Por favor, ingrese todos los datos del producto*"
      : "";
    setErrorMessage(errorMessage);

    if (isValid) {
      saveProduct();
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

  const modifyProduct = (id: string, isEdit: boolean): void => {
    if (isEdit) {
      setIdEdit(id);
      setProduct(products.find((item) => item.productIdentifier === id)!);
      setVisibility(true);
    } else {
      setProduct(defaultProduct);
    }
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
        placeHolderText={"Buscar por descripción..."}
        onFilter={(e: any) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      >
        <button
          onClick={() => {
            setVisibility(true);
            setProduct(defaultProduct);
          }}
          className="btn-addItem btn btn-primary rounded-pill d-flex flex-row align-items-center"
        >
          <FontAwesomeIcon className="" icon={faPlusSquare} />
          <p>Agregar producto</p>
        </button>
      </FilterComponent>
    );
  }, [filterText, resetPaginationToggle, setProduct]);

  return (
    <div className="products d-flex flex-column">
      <div className="table-wrapper">
        <DataTableBase
          title="Productos"
          columns={columns}
          data={filteredItems}
          subHeaderComponent={subHeaderComponentMemo}
          selectableRowsComponent={CheckboxComponent}
          progressPending={pending}
        />
      </div>
      <ModalForm
        title={"Agregar productos"}
        visibility={visibility}
        setVisibility={setVisibility}
        setIdEdit={setIdEdit}
      >
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label htmlFor="inputId" className="form-label">
              Identificador
            </label>
            {onEditId ? (
              <div className="form-control rounded-pill">
                {product.productIdentifier}
              </div>
            ) : (
              <input
                type="text"
                onChange={(e) => handleChange(e, "productIdentifier")}
                value={product.productIdentifier}
                className="form-control rounded-pill"
                id="inputId"
              />
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="inputState" className="form-label">
              Estado
            </label>
            <select
              onChange={(e) => handleChange(e, "statusProduct")}
              value={product.statusProduct}
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
              onChange={(e) => handleChange(e, "unitValue")}
              value={product.unitValue}
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
              {onEditId ? "Actualizar producto" : "Agregar producto"}
            </button>
          </div>
        </form>
      </ModalForm>
    </div>
  );
}
