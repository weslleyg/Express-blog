import React from "react";
import { Link } from "react-router-dom";

import { isAuthenticated, isAdmin, logout } from "../services/auth";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Navbar
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent-333"
        aria-controls="navbarSupportedContent-333"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent-333">
        <ul className="navbar-nav ml-auto nav-flex-icons">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
              <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            {isAuthenticated() ? (
              !(
                <Link className="nav-link" to="/login">
                  Entrar
                </Link>
              )
            ) : (
              <Link className="nav-link" to="/login">
                Entrar
              </Link>
            )}
          </li>
          <li className="nav-item">
            {isAuthenticated() ? (
              !(
                <Link className="nav-link" to="/signup">
                  Registrar-se
                </Link>
              )
            ) : (
              <Link className="nav-link" to="/signup">
                Registrar-se
              </Link>
            )}
          </li>
          <li className="nav-item dropdown">
            {isAuthenticated() ? (
              <>
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink-333"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-user" />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right dropdown-default"
                  aria-labelledby="navbarDropdownMenuLink-333"
                >
                  <Link className="dropdown-item" to="/">
                    Minha conta
                  </Link>
                  <a className="dropdown-item" href="/" onClick={logout}>
                    Sair
                  </a>
                </div>
              </>
            ) : (
              !(
                <>
                  <a
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink-333"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-user" />
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right dropdown-default"
                    aria-labelledby="navbarDropdownMenuLink-333"
                  >
                    <Link className="dropdown-item" to="/">
                      Minha conta
                    </Link>
                    <a className="dropdown-item" href="/" onClick={logout}>
                      Sair
                    </a>
                  </div>
                </>
              )
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
