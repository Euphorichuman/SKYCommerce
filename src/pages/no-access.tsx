import React from "react";
import "./styles/no-access.scss";

export function NoAccess() {
  return (
    <div className="container">
      <div className="container-wrapper">
        <div className="no-access-title">
          ¿SEGURO QUE DEBERIAS ESTAR AQUÍ?
          <div className="no-access-content">
              Al parecer tu organización no te dió acceso a este recurso. <br/>
              Si crees que deberías tenerlo por favor, contáctalos inmediatamente.
          </div>
        </div>
      </div>
    </div>
  );
}
