import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles/sidebar.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxes,
  faCartArrowDown,
  faUsers,
  faSignOutAlt,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

export class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-header d-flex flex-row justify-content-center">
          <Link className="brand non-style-link" to={"/dashboard"}>
            SKYCommerce
          </Link>
        </div>
        <div className="user-sidebar d-flex flex-column align-items-center">
          <div className="photo-user-sidebar-container">
            <img
              src={"https://i.pravatar.cc/300"}
              className="photo-user-sidebar"
              alt=""
            />
            <FontAwesomeIcon
              className="settings-icons-user-sidebar"
              icon={faCog}
            />
          </div>
          <h3 className="name-user-sidebar">John Doe</h3>
          <p className="type-user-sidebar">Administrator</p>
        </div>

        <ul className="nav-links">
          <li>
            <Link
              to="/dashboard"
              className="non-style-link d-flex flex-row align-items-center"
            >
              <FontAwesomeIcon className="nav-icon-list" icon={faBoxes} />
              <span className="nav-text">Productos</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="non-style-link d-flex flex-row align-items-center"
            >
              <FontAwesomeIcon
                className="nav-icon-list"
                icon={faCartArrowDown}
              />
              <span className="nav-text">Ventas</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="non-style-link d-flex flex-row align-items-center"
            >
              <FontAwesomeIcon className="nav-icon-list" icon={faUsers} />
              <span className="nav-text">Usuarios</span>
            </Link>
          </li>
        </ul>

        <div className="logout-sidebar">
          <div className="logout-content d-flex flex-row align-items-center justify-content-evenly">
            <p>Cerrar sesión</p>
            <FontAwesomeIcon className="logout-icon" icon={faSignOutAlt} />
          </div>
        </div>
      </div>
    );
  }
}
