import { Typography } from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import AlertRight from "../../../component/alert/AlertRight";
import { delCart } from '../../../redux/action';

const FittingCart = (props) => {
    const [open, setOpen] = useState(false);
    const state = useSelector((state) => state.HandleCart)
    const dispatch = useDispatch()

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

    const changeColor = (btn) => {
        const colors = document.querySelectorAll("#color");
        
        colors.forEach(color => color.classList.remove("active"));
        btn.classList.add("active");
        console.log(btn);
    }

    function changeSize(btn) {
        const sizes = document.querySelectorAll("#size");

        sizes.forEach(size => size.classList.remove("active"));
        btn.classList.add("active");
        console.log(btn.key);
    }

    const ShowProducts = (product) => {
        return (
            <>
                <div className="col-md-12 mb-3">
                    <div className="card h-100 text-center p-4" key={product.id}>
                        <img src={product.image} className="card-img-top" alt={product.title} height="250px" />
                        <div className="card-body">
                            <h5 className="card-title mb-0">{product.title.substring(0, 12)}...</h5>
                            <p className="card-text lead fw-bold">{product.price} €</p>
                            <div className="buttons justify-content-center d-flex my-4">
                                {["S", "M", "L", "XL"].map((size) => {
                                    return (
                                        <button className="btn btn-outline-dark me-2" onClick={(e) => changeSize(e.target)}>{size}</button>
                                    );
                                })}
                            </div>
                            <div className="buttons justify-content-center d-flex colors my-4">
                                {["red", "blue", "green", "black"].map((color) => {
                                    return (
                                        <button className="btn btn-outline-dark me-2" style={{ background: color }} onClick={(e) => changeColor(e.target)}></button>
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