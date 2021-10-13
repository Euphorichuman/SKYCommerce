import React, { Component } from "react";
import { Link } from "react-router-dom";
import './styles/topbar.scss'

export class Topbar extends Component {
  render() {
    return (
      <nav className="topbar d-flex flex-row justify-content-between align-items-center">
          <Link className="brand-topbar navbar-brand d-flex align-items-center" to={"/dashboard"}>
            SKYCommerce
          </Link>
          <div className="user-topbar d-flex flex-row align-items-center">
            <img className="avatar-topbar" src={"https://i.pravatar.cc/300"} alt="" />
            <p className="username-topbar">John Doe</p>
          </div>
      </nav>
    );
  }
}
