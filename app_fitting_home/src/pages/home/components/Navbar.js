import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navbar, Container} from "react-bootstrap"

const Navigation = () => {
    const state = useSelector((state) => state.HandleCart);
    return (
        <div>
            <Navbar expand="lg" className="navbar navbar-expand-lg bg-body-tertiary py-3 shadow-sm">
                <Container>
                    <NavLink className="navbar-brand fw-bold fs-4" to="#">FITTING HOME</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="collapse navbar-collapse" id="basic-navbar-nav">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/marketplace">Boutique</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/fitting-room">Cabine d'essayage</NavLink>
                            </li>
                        </ul>
                        <div className="buttons">
                            <NavLink to="/shopping-cart" className="btn btn-outline-dark me-2" style={{ maxWidth: "200px" }}>
                                <i className="fa fa-shopping-cart me-1"></i> Mon panier ({state.length})
                            </NavLink>
                            <NavLink to="/account" className="btn btn-outline-dark" style={{ maxWidth: "200px" }}>
                                <i className="fa fa-user-circle-o me-1"></i> Mon compte
                            </NavLink>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Navigation;