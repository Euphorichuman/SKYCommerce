import React from "react";
import DataTable, { TableProps } from "react-data-table-component";

const ExpandedComponent = (data: object) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);

export function DataTableBase<T>(props: TableProps<T>): JSX.Element {
  return (
    <DataTable
      title="Productos"
      pagination
      responsive
      expandableRows
      expandableRowsComponent={ExpandedComponent}
      selectableRows
      subHeader
      subHeaderWrap
      {...props}
    />
  );
}
