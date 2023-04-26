import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import AlertRight from "../../../component/alert/AlertRight";
import { delCart } from '../../../redux/action';
import "../../../style/App.css";

const FittingCart = (props) => {
    const [open, setOpen] = useState(false);
    const [garments, setGarments] = useState({
        "top": { id: "", color: "", size: "", filename: "" },
        "down": { id: "", color: "", size: "", filename: "" }
    });
    const [garmentFilename, setGarmentFilename] = useState();

const state = useSelector((state) => state.HandleCart)
const dispatch = useDispatch()

useEffect(() => {
    console.log(garments);
}, [garments, garmentFilename]);

const modelStyle = {
    display: 'block',
    backgroundColor: 'rgba(0,0,0,0.8)',
}

const handleDel = (item) => {
    dispatch(delCart(item));
    setOpen(true);
}

const emptyCart = () => {
    return (
        <div className="px-4 my-5 bg-light rounded-3 py-5">
            <div className="container py-4">
                <div className="row text-center">
                    <h3>Votre panier est vide</h3>
                </div>
            </div>
        </div>
    )
}
function getGarmentFilename(product, color, size) {
    product.garments.forEach((garment) => {
        var selectedColor = color === '' ? garment.color : color;
        var selectedSize = size === '' ? garment.size : size;
        if (garment.color === selectedColor && garment.size === selectedSize) {
            setGarmentFilename(garment.filename);
        }
    });
};

const changeColor = (btn, product) => {
    let index = product.type;
    let newGarment = garments[index];

    newGarment["color"] = btn.value;
    newGarment["size"] = newGarment["id"] === btn.id ? newGarment["size"] : "";
    newGarment["id"] = btn.id;
    getGarmentFilename(product, newGarment['color'], newGarment['size']);
    newGarment['filename'] = garmentFilename;
    
    garments[index] = newGarment;
    setGarments({...garments});
}

function changeSize(btn, product) {
    let index = product.type;
    let newGarment = garments[index];
    
    newGarment["color"] = newGarment["id"] === btn.id ? newGarment["color"] : "";
    newGarment["size"] = btn.value;
    newGarment["id"] = btn.id;
    getGarmentFilename(product, newGarment['color'], newGarment['size']);
    newGarment['filename'] = garmentFilename;

    garments[index] = newGarment;
    setGarments({...garments});
}

const setDetailsColor = (product) => {
    var colors = [];

    product?.garments?.forEach((garment) => {
        if (!colors.includes(garment.color)) {
            colors.push(garment.color);
        }
    });
    return colors;
};

const setDetailsSize = (product) => {
    var sizes = [];

    product?.garments?.forEach((garment) => {
        if (!sizes.includes(garment.size)) {
            sizes.push(garment.size);
        }
    });
    return sizes;
};

const ShowProducts = (product) => {
    const colors = setDetailsColor(product);
    const sizes = setDetailsSize(product);
    return (
        <>
            <div className="col-md-12 mb-3">
                <div className="card h-100 text-center p-4" key={product._id}>
                    <img crossOrigin="anonymous" src={`http://91.172.40.53:8080/image?id=${product.imagePath.substring(0, 36)}`} className="card-img-top" alt={product.name} height="250px" />
                    <div className="card-body">
                        <h5 className="card-title mb-0">{product.description.substring(0, 12)}...</h5>
                        <p className="card-text lead fw-bold">{product.price} €</p>
                        <div className="buttons justify-content-center d-flex my-4">
                            {sizes.map((size) => {
                                const isActive = (garments[product.type]["id"] === product._id && garments[product.type]["size"] === size) ? "active" : "";
                                return (
                                    <button id={product._id} key={size} className={"btn btn-outline-dark me-2 " + isActive} value={size} onClick={(e) => changeSize(e.target, product)}>{size}</button>
                                );
                            })}
                        </div>
                        <div className="buttons justify-content-center d-flex colors my-4">
                            {colors.map((color) => {
                                const isActive = (garments[product.type]["id"] === product._id && garments[product.type]["color"] === color) ? "active" : "";
                                return (
                                    <button id={product._id} key={color} className={"color btn btn-outline-dark me-2 " + isActive} style={{ background: color }} value={color} onClick={(e) => changeColor(e.target, product)}></button>
                                );
                            })}
                        </div>
                        <button className="btn btn-outline-dark my-2 px-4 py-2">Essayer</button>
                        <button className="btn btn-dark my-2 ms-2 px-3 py-2" onClick={() => handleDel(product)}>Retirer du panier</button>
                    </div>
                </div>
            </div>
        </>
    )
}

return (
    <div>
        <div className="modal" style={modelStyle}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Mon panier</h5>
                        <button type="button" className="btn-close" aria-label="Fermer" onClick={props.hide}></button>
                    </div>
                    <div className="modal-body">

                        <div className="container my-5">
                            <div className="overflow-auto" style={{ "maxWidth": "400px", "maxHeight": "500px" }}>
                                {state.length === 0 && emptyCart()}
                                {state.length !== 0 && state.map(ShowProducts)}
                                <AlertRight
                                    open={open}
                                    setOpen={setOpen}
                                    text="Article retiré du panier"
                                >
                                    <Typography variant="body"></Typography>
                                </AlertRight>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
);
}

export default FittingCart;