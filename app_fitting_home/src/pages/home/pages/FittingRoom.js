import { useState } from "react";
import { NavLink } from "react-router-dom";
import Viewport3D from "../../threejs/Viewport3D";
import FittingCart from "../components/FittingCart";
import Navbar from "../components/Navbar";
import AlertRight from "../../../component/alert/AlertRight";
import { Typography } from "@mui/material";

function FittingRoom() {
    const [modal, setModal] = useState(false);
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Navbar />
            <AlertRight
                open={open}
                setOpen={setOpen}
                text="AR disponible unique sur mobile (sur iOS téléchargez XRViewer)"
            >
                <Typography variant="body"></Typography>
            </AlertRight>
            <div className="container">
                <div className="row">
                    { modal === true ? <FittingCart hide={() => setModal(false)}/> : '' }
                    <div className="col-12">
                        <Viewport3D modelId={"blender_emma.fbx"}/>
                        <div className="row text-center">
                            <div className="">
                                <button className="btn btn-outline-dark me-3 mb-3" onClick={() => setModal(true)}>Mes vêtements</button>
                                <button className="btn btn-outline-dark mb-3" onClick={() => {setOpen(true); window.app.showModel("chair.fbx")}}>AR</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FittingRoom;