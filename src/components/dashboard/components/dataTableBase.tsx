import React from "react";
import DataTable, { createTheme, TableProps, Alignment } from "react-data-table-component";
import './styles/dataTableBase.scss'

const customStyles = {
  rows: {
      style: {
          minHeight: '72px', // override the row heigh
          borderRadius: '7px',
          color: '#A0A0A2',
          backgroundColor: '#35363A',
          marginBottom: '10px',
          border: 'none !important', 
      },
  },
  headCells: {
      style: {
          paddingLeft: '8px', // override the cell padding for head cells
          paddingRight: '8px',
      },
  },
  cells: {
      style: {
          paddingLeft: '8px', // override the cell padding for data cells
          paddingRight: '8px',
      },
  },
};

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
