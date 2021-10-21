import React, { useState, useMemo } from "react";
import { TableColumn } from "react-data-table-component";
import { productsData } from "./productsData";
import { DataTableBase } from "./components/dataTableBase";
import { FilterComponent } from "./components/filterComponent";
import { CheckboxComponent } from "./components/checkboxComponent";
import { ModalForm } from "./components/modalForm";
import "./styles/products.scss";

interface DataRow {
  id: number;
  description: string;
  price: string;
  state: string;
}

const columns: TableColumn<DataRow>[] = [
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
        when: (row) => row.state === "available",
        style: {
          color: "#fff",
        },
      },
    ],
  },
];

export function Products(): JSX.Element {
  /*const [pending, setPending] = useState(true);
  const [products, setProducts] = useState<Array<object>>([]);*/
  const [visibility, setVisibility] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = productsData.filter(
    (item) =>
      item.description &&
      item.description.toLowerCase().includes(filterText.toLowerCase())
  );

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
        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="inputId" className="form-label">
              Identificador
            </label>
            <input
              type="text"
              className="form-control rounded-pill"
              id="inputId"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputState" className="form-label">
              Estado
            </label>
            <select id="inputState" className="form-select rounded-pill">
              <option selected>Disponible</option>
              <option>No disponible</option>
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputDescription" className="form-label">
              Descripción
            </label>
            <input
              type="text"
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
              className="form-control rounded-pill"
              id="inputValue"
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary rounded-pill color-in">
              Agregar producto
            </button>
          </div>
        </form>
      </ModalForm>
    </div>
  );
}
