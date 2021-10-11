import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/footer.scss";

export class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="d-flex flex-row justify-content-around mx-auto">
          <div className="footer-item">
            <h3>SKYCommerce</h3>
            <p>© SKYProgramming</p>
          </div>
          <div className="footer-item-info d-flex flex-row justify-content-between">
            <div className="resource d-flex flex-column">
              <h3>Recursos</h3>
              <Link to={"/"}>Docs</Link>
              <Link to={"/"}>Términos</Link>
              <Link to={"/"}>Privacidad</Link>
            </div>
            <div className="us d-flex flex-column">
              <h3>Nosotros</h3>
              <Link to={"/"}>Acerca de</Link>
              <Link to={"/"}>Contribuciones</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
