import React from "react";
import "./styles/loading.scss";

export function Loading() {
  return (
    <div className="lds-roller-wrapper d-flex aling-items-center justify-content-center">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
