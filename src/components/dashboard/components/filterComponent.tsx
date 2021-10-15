import React, { Component, Fragment } from "react";

interface IFilterComponentProps {
    onFilter: any,
    onClear: any,
    filterText: string
}

export class FilterComponent extends Component<IFilterComponentProps> {
  render() {
      const {onFilter, onClear, filterText} = this.props;
    return (
      <Fragment>
        <input
          id="search"
          type="text"
          placeholder="Filter table data..."
          value={filterText}
          onChange={onFilter}
        />
        <button onClick={onClear}>Borrar</button>
      </Fragment>
    );
  }
}
