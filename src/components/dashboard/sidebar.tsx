import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useGoogleAuth } from "../../providers/authentication";
import "./styles/sidebar.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxes,
  faCartArrowDown,
  faUsers,
  faSignOutAlt,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

export function Sidebar(): JSX.Element {
  const { googleUser, signOut }: any = useGoogleAuth();
  const history = useHistory();
  
  const handleSignOut = async () => {
    await signOut();
    window.sessionStorage.removeItem('tokenId');
    history.push('/login');
  };

  return (
    <div className="sidebar d-flex flex-column">
      <div className="sidebar-header d-flex flex-row justify-content-center">
        <Link className="brand non-style-link" to={"/dashboard"}>
          SKYCommerce
        </Link>
      </div>
      <div className="user-sidebar d-flex flex-column align-items-center">
        <div className="photo-user-sidebar-container">
          <img
            src={googleUser.profileObj.imageUrl}
            className="photo-user-sidebar"
            alt=""
          />
          <FontAwesomeIcon
            className="settings-icons-user-sidebar"
            icon={faCog}
          />
        </div>
        <h3 className="name-user-sidebar">{googleUser.profileObj.name}</h3>
        <p className="type-user-sidebar">[Tipo de usuario]</p>
      </div>

      <ul className="nav-links">
        <li>
          <Link
            to="/dashboard/products"
            className="non-style-link d-flex flex-row align-items-center"
          >
            <FontAwesomeIcon className="nav-icon-list" icon={faBoxes} />
            <span className="nav-text">Productos</span>
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/sales"
            className="non-style-link d-flex flex-row align-items-center"
          >
            <FontAwesomeIcon className="nav-icon-list" icon={faCartArrowDown} />
            <span className="nav-text">Ventas</span>
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/users"
            className="non-style-link d-flex flex-row align-items-center"
          >
            <FontAwesomeIcon className="nav-icon-list" icon={faUsers} />
            <span className="nav-text">Usuarios</span>
          </Link>
        </li>
      </ul>

      <div className="logout-sidebar">
        <div className="logout-content d-flex flex-row align-items-center justify-content-center">
          <button
            onClick={handleSignOut}
            className="logout-button d-flex flex-row align-items-center justify-content-around"
          >
            <p>Cerrar sesión</p>
            <FontAwesomeIcon className="logout-icon" icon={faSignOutAlt} />
          </button>
        </div>
      </div>
    </div>
  );
}
