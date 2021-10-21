import React, { useState, useMemo } from "react";
import { TableColumn } from "react-data-table-component";
import { productsData } from "./productsData";
import { DataTableBase } from "./components/dataTableBase";
import { FilterComponent } from "./components/filterComponent";
import { CheckboxComponent } from "./components/checkboxComponent";
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
      }
    ],
  },
];

export function Products(): JSX.Element {
  /*const [pending, setPending] = useState(true);
  const [products, setProducts] = useState<Array<object>>([]);*/

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
    </div>
  );
}
