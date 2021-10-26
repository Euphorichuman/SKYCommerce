import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { LoginGoogle } from "../components/loginGoogle";
import "./styles/login.scss";

export function Login(): JSX.Element {
  return (
    <div className="container d-flex flex-row justify-content-around">
      <div className="container login d-flex flex-column justify-content-between">
        <div className="header">
          <Link className="brand-lg non-style-link" to={"/"}>
            SKYCommerce
          </Link>
        </div>
        <Fragment>
          <p>¡Bienvenido!</p>
          <LoginGoogle />
          <p className="text-dl">O usa</p>
          <div className="email-login">
            <form action="">
              <fieldset disabled={true}>
                <input
                  type="email"
                  className="input-d nmt form-control fc-margin rounded-pill"
                  id="inputEmail"
                  aria-describedby="emailHelp"
                  placeholder="Correo"
                />
                <input
                  type="password"
                  className="input-d nmb form-control fc-margin rounded-pill"
                  id="inputPassword"
                  aria-describedby="passwordHelp"
                  placeholder="Contraseña"
                />
                <div className=" d-flex flex-row justify-content-between">
                  <Link className="link-t non-style-link" to={"/login"}>
                    No tienes una cuenta aún
                  </Link>
                  <Link className="link-t non-style-link" to={"/login"}>
                    Olvidé mi contraseña
                  </Link>
                </div>
                <button
                  type={undefined}
                  className="btn btn-primary btn-custom rounded-pill"
                >
                  Iniciar sesión
                </button>
              </fieldset>
            </form>
          </div>
          <p className="note">
            Actualmente solo puedes iniciar sesión con Google, si tienes alguna
            duda contáctanos.
          </p>
        </Fragment>
      </div>
    </div>
  );
}
