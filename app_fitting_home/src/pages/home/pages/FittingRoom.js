import { useState } from "react";
import { NavLink } from "react-router-dom";
import Viewport3D from "../../threejs/Viewport3D";
import FittingCart from "../components/FittingCart";
import Navbar from "../components/Navbar";

function FittingRoom() {
    const [modal, setModal] = useState(false);

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    { modal === true ? <FittingCart hide={() => setModal(false)}/> : '' }
                    <div className="col-12">
                        <Viewport3D />
                        <div className="row text-center">
                            <div className="">
                                <button className="btn btn-outline-dark me-3 mb-3" onClick={() => setModal(true)}>Mes vêtements</button>
                                <button className="btn btn-outline-dark mb-3" onClick={() => window.app.showChair(1)}>AR</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FittingRoom;