import React, { Component } from "react";
import "./styles/filterComponent.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

interface IFilterComponentProps {
  onFilter: any;
  onClear: any;
  setVisibility: any;
  filterText: string;
}

export class FilterComponent extends Component<IFilterComponentProps> {
  render() {
    const { onFilter, /*onClear,*/ setVisibility, filterText } = this.props;
    return (
      <div className="subHeader-wrapper d-flex flex-row justify-content-between">
        <input
          className="searchBar form-control rounded-pill"
          type="search"
          id="search"
          placeholder="Buscar por descripción..."
          aria-label="Buscar"
          value={filterText}
          onChange={onFilter}
        />
        <button onClick={() => setVisibility(true)} className="btn-addItem btn btn-primary rounded-pill d-flex flex-row align-items-center">
          <FontAwesomeIcon className="" icon={faPlusSquare} />
          <p>Agregar item</p>
        </button>
      </div>
    );
  }
}
