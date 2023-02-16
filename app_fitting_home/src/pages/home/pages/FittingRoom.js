import Viewport3D from "../../threejs/Viewport3D";
import FittingCart from "../components/FittingCart";
import Navbar from "../components/Navbar";

function FittingRoom() {

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <FittingCart />
                    </div>
                    <div className="col-8">
                        <Viewport3D />
                    </div>
                </div>
            </div>


        </div>
    );
}

export default FittingRoom;