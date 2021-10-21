import React from "react";
import DataTable, { TableProps, Alignment } from "react-data-table-component";
import './styles/dataTableBase.scss'

const paginationComponentOptions = {
  noRowsPerPage: true,
  rangeSeparatorText: 'de',
  selectAllRowsItem: false
};

export function DataTableBase<T>(props: TableProps<T>): JSX.Element {
  return (
    <DataTable
      title="Productos"
      pagination
      paginationPerPage={8}
      responsive
      selectableRows
      subHeader
      subHeaderWrap
      subHeaderAlign={Alignment.LEFT}
      paginationComponentOptions={paginationComponentOptions}
      {...props}
    />
  );
}
