import Viewport3D from "../../threejs/Viewport3D";
import Navbar from "../components/Navbar";
import Product from "../components/Product";

function ProductDetail() {

    return(
        <div>
            <Navbar/>
            <div className="container py-5">
                <div className="row py-4">
                    <div className="col-md-6">
                        <Viewport3D modelId={"blender_emma.fbx"}/>
                    </div>
                    <div className="col-md-6">
                        <Product/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;