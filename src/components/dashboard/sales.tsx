import React, { useState, useMemo, ChangeEvent } from "react";
import { TableColumn } from "react-data-table-component";
import { DataTableBase } from "./components/dataTableBase";
import { FilterComponent } from "./components/filterComponent";
import { CheckboxComponent } from "./components/checkboxComponent";
import { ModalForm } from "./components/modalForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faPencilAlt,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useSales } from "../../hooks/sales"; // Hooks
import { Sale, defaultSale } from "../../hooks/interfaces";
import "./styles/sales.scss";

type FormElement = React.FormEvent<HTMLFormElement>;

export function Sales() {
  const {
    sale,
    setSale,
    sales,
    pending,
    deleteSale,
    onEditId,
    setIdEdit,
    saveSale,
  } = useSales();
  /** Columns of data table (react-data-table-component) */
  const columns: TableColumn<Sale>[] = [
    {
      name: "Id",
      selector: (row) => row.saleIdentifier,
      sortable: true,
    },
    {
      name: "Id producto",
      selector: (row) => row.soldProductIdentifier,
    },
    {
      name: "Fecha",
      selector: (row) => row.saleDate,
      sortable: true,
    },
    {
      name: "Cliente",
      selector: (row) => row.nameClient,
      sortable: true,
    },
    {
      name: "Id Cliente",
      selector: (row) => row.idClient,
      sortable: true,
    },
    {
      name: "Valor c/u",
      selector: (row) => row.unitValueProduct,
      sortable: true,
    },
    {
      name: "Cantidad",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => row.totalValue,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.statusSale,
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row) => row.statusSale === "Entregada",
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
              onClick={() => modifySale(row.saleIdentifier, true)}
              id={row.saleIdentifier}
              className=""
              icon={faPencilAlt}
            />
          </div>
          <div className="action d-flex align-items-center justify-content-center">
            <FontAwesomeIcon
              onClick={() => deleteSale(row.saleIdentifier)}
              id={row.saleIdentifier}
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
  const filteredItems = sales.filter((item) =>
    item.saleIdentifier.toString().includes(filterText)
  );

  /** Submit product form */
  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();

    const isValid =
      sale.idClient &&
      sale.nameClient &&
      sale.quantity &&
      sale.saleDate &&
      sale.saleIdentifier &&
      sale.soldProductIdentifier &&
      sale.statusSale &&
      sale.totalValue &&
      sale.unitValueProduct;
    const errorMessage = !isValid
      ? "Por favor, ingrese todos los datos de la venta*"
      : "";
    setErrorMessage(errorMessage);

    if (isValid) {
      saveSale();
      setSale(defaultSale);
      setVisibility(false);
    }
  };

  /** Changes in form products form*/
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    key: string
  ): void => {
    setErrorMessage("");
    setSale({
      ...sale,
      [key]: e.target.value,
    });
  };

  const modifySale = (id: string, isEdit: boolean): void => {
    if (isEdit) {
      setIdEdit(id);
      setSale(sales.find((item) => item.saleIdentifier === id)!);
      setVisibility(true);
    } else {
      setSale(defaultSale);
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
        placeHolderText={"Buscar por identificador de venta..."}
        onFilter={(e: any) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      >
        <button
          onClick={() => {
            setVisibility(true);
            setSale(defaultSale);
          }}
          className="btn-addItem btn btn-primary rounded-pill d-flex flex-row align-items-center"
        >
          <FontAwesomeIcon className="" icon={faPlusSquare} />
          <p>Agregar venta</p>
        </button>
      </FilterComponent>
    );
  }, [filterText, resetPaginationToggle, setSale]);

  return (
    <div className="products d-flex flex-column">
      <div className="table-wrapper">
        <DataTableBase
          title="Ventas"
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
            <label htmlFor="inputProductId" className="form-label">
              Identificador del producto
            </label>
            <input
              type="text"
              onChange={(e) => handleChange(e, "soldProductIdentifier")}
              value={sale.soldProductIdentifier}
              className="form-control rounded-pill"
              id="inputProductId"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputId" className="form-label">
              Identificador de venta
            </label>
            {onEditId ? (
              <div className="form-control rounded-pill">
                {sale.saleIdentifier}
              </div>
            ) : (
              <input
                type="text"
                onChange={(e) => handleChange(e, "saleIdentifier")}
                value={sale.saleIdentifier}
                className="form-control rounded-pill"
                id="inputId"
              />
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="inputDate" className="form-label">
              Fecha de venta
            </label>
            <input
              type="text"
              onChange={(e) => handleChange(e, "saleDate")}
              value={sale.saleDate}
              className="form-control rounded-pill"
              id="inputDate"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputStatus" className="form-label">
              Estado
            </label>
            <select
              onChange={(e) => handleChange(e, "statusSale")}
              value={sale.statusSale}
              id="inputStatus"
              className="form-select rounded-pill"
            >
              <option defaultValue="En proceso">En proceso</option>
              <option value="Cancelada">Cancelada</option>
              <option value="Entregada">Entregada</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="inputIdClient" className="form-label">
              Identificación del cliente
            </label>
            <input
              type="text"
              onChange={(e) => handleChange(e, "idClient")}
              value={sale.idClient}
              className="form-control rounded-pill"
              id="inputIdClient"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputNameClient" className="form-label">
              Nombre del cliente
            </label>
            <input
              type="text"
              onChange={(e) => handleChange(e, "nameClient")}
              value={sale.nameClient}
              className="form-control rounded-pill"
              id="inputNameClient"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputUnitValueProduct" className="form-label">
              Valor (c/u)
            </label>
            <input
              type="text"
              onChange={(e) => handleChange(e, "unitValueProduct")}
              value={sale.unitValueProduct}
              className="form-control rounded-pill"
              id="inputUnitValueProduct"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputQuantity" className="form-label">
              Cantidad
            </label>
            <input
              type="text"
              onChange={(e) => handleChange(e, "quantity")}
              value={sale.quantity}
              className="form-control rounded-pill"
              id="inputQuantity"
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputTotalValue" className="form-label">
              Total venta
            </label>
            <input
              type="text"
              onChange={(e) => handleChange(e, "totalValue")}
              value={sale.totalValue}
              className="form-control rounded-pill"
              id="inputTotalValue"
            />
          </div>
          <span>{errorMessage}</span>
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary rounded-pill color-in"
            >
              {onEditId ? "Actualizar venta" : "Agregar venta"}
            </button>
          </div>
        </form>
      </ModalForm>
    </div>
  );
}
