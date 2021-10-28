import React, { Component } from "react";
import "./styles/filterComponent.scss";

interface IFilterComponentProps {
  placeHolderText?: string;
  onFilter: any;
  onClear: any;
  filterText: string;
  children?: React.ReactNode;
}

export class FilterComponent extends Component<IFilterComponentProps> {
  render() {
    const { placeHolderText, onFilter, filterText, children } = this.props;
    return (
      <div className="subHeader-wrapper d-flex flex-row justify-content-between">
        <input
          className="searchBar form-control rounded-pill"
          type="search"
          id="search"
          placeholder={placeHolderText}
          aria-label="Buscar"
          value={filterText}
          onChange={onFilter}
        />
        {children}
      </div>
    );
  }
}
