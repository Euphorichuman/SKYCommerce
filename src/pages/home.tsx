import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/card";
import "./styles/home.scss";

export function Home() {
  return (
    <Fragment>
      <div className="container">
        <h1 className="mx-auto">Fácil, rápido y limpio</h1>
        <p className="spacer mt-4 ">
          La mejor herramienta de manufactura que le permitirá hacer el
          seguimiento de las ventas de los producto y/o servicio de su negocio o
          empresa.
        </p>
        <Link to={"/login"} className="btn-custom-xs btn btn-primary rounded-pill mt-4">
          Empezar ahora
        </Link>
      </div>

      <div className="container">
        <div className="row">
          <Card
            title="Fácil"
            description="Una herramienta muy intuitiva para que me manejes tu negocio a tu ritmo."
          />
          <Card
            title="Rápido"
            description="Optimizado para que puedas hacer los seguimientos sin ningún contratiempo."
          />
          <Card
            title="Limpio"
            description="Una interfaz sencilla para que no te perdias de nada y uses todas las opciones que te ofrecemos."
          />
        </div>
        <br />
        <div className="row">
          <Card
            title="Protegido"
            description="Usamos Oauth 2 para bridar la mejor seguridad a todos tus datos."
          />
          <Card
            title="Productos"
            description="Módulo para que gestiones todos los productos y/o servicios de tu negocio."
          />
          <Card
            title="Ventas"
            description="Módulo para que gestiones todos las ventas de tu negocio."
          />
        </div>
      </div>

      <div className="container contact d-flex flex-row justify-content-around">
        <div>
          <h3>¿Tienes algo para decirnos?</h3>
          <p>Contáctanos</p>
        </div>
        <div>
          <p>Una gran visión sin grandes personas es irrelevante.</p>
          <form action="">
            <div className="form-group">
              <input
                type="text"
                className="form-control rounded-pill"
                id="inputName"
                aria-describedby="nameHelp"
                placeholder="Ingresa tu nombre"
              />
              <input
                type="email"
                className="form-control fc-margin rounded-pill"
                id="inputEmail"
                aria-describedby="emailHelp"
                placeholder="Ingresa tu correo"
              />
              <textarea
                name=""
                className="form-control fc-ta"
                id="inputMessage"
                cols={40}
                rows={10}
                placeholder="Déjanos un mensaje..."
              ></textarea>
              <div className="btn-submit d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-primary rounded-pill color-in"
                >
                  Enviar mensaje
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
