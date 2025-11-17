import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { type Customer } from "../hooks/useCustomers";
import useMe from "../hooks/useMe";

const Layout = () => {
  // const nav = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("access");
    // nav("login");
    location.href = "/";
  };
  const [collapsed, setCollapsed] = useState(true);
  const { data, isLoading } = useMe<Customer>();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand d-flex" href="/">
            <img
              src="/clown-fish.png"
              alt="Logo"
              width="50"
              height="44"
              className="d-inline-block align-text-top"
            />
            <h1 className="d-inline text-center">Lady Fish</h1>
          </a>

          {!isLoading && data && (
            <React.Fragment>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={() => {
                  setCollapsed(!collapsed);
                }}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className={`collapse navbar-collapse ${
                  !collapsed ? "show" : ""
                }`}
                id="navbarNav"
              >
                <div className="d-flex align-items-center w-100">
                  <ul className="navbar-nav flex-grow-1">
                    <li className="nav-item my-2">
                      <Link className="nav-link" aria-current="page" to="/">
                        Início
                      </Link>
                    </li>
                    <li className="nav-item my-2">
                      <Link className="nav-link" to="/products">
                        Produtos
                      </Link>
                    </li>
                    {/*<li className="nav-item my-2">
                      <Link className="nav-link" to="/ground">
                        Campo
                      </Link>
                    </li> */}
                  </ul>
                  {data && !isLoading && (
                    <div className="d-block text-end">
                      <button
                        className="my-4 me-2 btn btn-outline-danger"
                        onClick={handleLogout}
                      >
                        Sair de {data.first_name}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </nav>

      <div className="p-1">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
