import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navbar, Container, Button } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const navigateRegister = () => {
    navigate("/login");
  };

  function disconnect() {
    console.log("disconnect");
    console.log(JSON.parse(localStorage.getItem("user")));

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("credentials");

    console.log(JSON.parse(localStorage.getItem("user")));
    navigateRegister();
  }
  const state = useSelector((state) => state.HandleCart);
  return (
    <div>
      <Navbar
        expand="lg"
        className="navbar navbar-expand-lg bg-body-tertiary py-3 shadow-sm"
      >
        <Container>
          <NavLink className="navbar-brand fw-bold fs-4" to="#">
            FITTING HOME
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className="collapse navbar-collapse"
            id="basic-navbar-nav"
          >
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/marketplace">
                  Boutique
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/fitting-room">
                  Cabine d'essayage
                </NavLink>
              </li>
            </ul>
            <div className="buttons">
              <NavLink
                to="/shopping-cart"
                className="btn btn-outline-dark me-2"
                style={{ maxWidth: "200px" }}
              >
                <i className="fa fa-shopping-cart me-1"></i> Mon panier (
                {state.length})
              </NavLink>
              <NavLink
                to="/account"
                className="btn btn-outline-dark"
                style={{ maxWidth: "200px" }}
              >
                <i className="fa fa-user-circle-o me-1"></i> Mon compte
              </NavLink>
              <Button
                style={{
                  maxWidth: "200px",
                  marginLeft: "10px",
                  backgroundColor: "white",
                  color: "red",
                }}
                className="btn btn-outline-dark"
                onClick={disconnect}
              >
                <i class="fa fa-sign-out" aria-hidden="true"></i>
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
