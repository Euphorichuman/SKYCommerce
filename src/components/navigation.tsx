import React, { Component } from "react";
import { Link } from "react-router-dom";
import './styles/navigation.scss'

export class Navigation extends Component {
  render() {
    return (
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark p-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
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
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to={"/"}>
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"#"}>
                  Acerca de nosotros
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"#"}>
                  Soluciones
                </Link>
              </li>
            </ul>
            <Link to={"/login"} className="btn btn-primary rounded-pill color-in">Iniciar sesión</Link>
          </div>
        </div>
      </nav>
    );
  }
}
