import React, { Component } from "react";
import { Link } from "react-router-dom";
import './css/navigation.css'

export class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-4">
        <div className="container-fluid px-5">
          <Link className="navbar-brand" to={"#"}>
            SKYCommerce
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to={"#"}>
                  Soluciones
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"#"}>
                  Acerca de nosotros
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"#"}>
                  Precios
                </Link>
              </li>
              <button type="button" className="btn btn-dark rounded-pill color-in">Iniciar sesión</button>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
