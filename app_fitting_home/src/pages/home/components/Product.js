import "../../../style/App.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../../../redux/action";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import AlertRight from "../../../component/alert/AlertRight";
import { Typography } from "@mui/material";

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState();
    const [size, setSize] = useState();

    const dispatch = useDispatch();
    const addProduct = (product) => {
        dispatch(addCart(product));
        setOpen(true);
    }

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            setProduct(await response.json());
            setLoading(false);
        };
        getProduct();

        console.log(size);
        console.log(color);
    }, [id, size, color]);

    const Loading = () => {
        return (
            <>
                <div className="col-md-6">
                    <Skeleton height={400} />
                </div>
                <div className="col-md-6" style={{ lineHeight: 2 }}>
                    <Skeleton height={50} width={300} />
                    <Skeleton height={70} />
                    <Skeleton height={25} width={150} />
                    <Skeleton height={50} />
                    <Skeleton height={150} />
                    <Skeleton height={50} width={100} />
                    <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
                </div>
            </>
        );
    };

    const ShowProduct = () => {
        return (
            <div>
                <h4 className="text-uppercase text-black-50">{product.category}</h4>
                <h1 className="display-5">{product.title}</h1>
                <h3 className="display-6 fw-bold my-4">{product.price} €</h3>
                <div className="buttons d-flex my-4">
                    {["S", "M", "L", "XL"].map((s) => {
                        const isActive = (s === size ? "active" : "");
                        return (
                            <button id={s} key={s} className={"btn btn-outline-dark me-2 " + isActive} onClick={(e) => setSize(e.target.id)}>{s}</button>
                        );
                    })}
                </div>
                <div className="buttons d-flex colors my-4">
                    {["red", "blue", "green", "black"].map((c) => {
                        const isActive = c === color ? "active" : "";
                        return (
                            <button id={c} key={c} className={"color btn me-2 " + isActive} style={{ background: c }} onClick={(e) => setColor(e.target.id)}></button>
                        );
                    })}
                </div>
                <button className="btn btn-outline-dark px-4 py-2" onClick={() => addProduct(product)}>Ajouter au panier</button>
                <NavLink to="/shopping-cart" className="btn btn-dark ms-2 px-3 py-2">Aller au panier</NavLink>
                <AlertRight
                    open={open}
                    setOpen={setOpen}
                    text="Cet article a été ajouté au panier"
                >
                    <Typography variant="body"></Typography>
                </AlertRight>
            </div>
        );
    };

    return (
        <div>
            {loading ? <Loading /> : <ShowProduct />}
        </div>
    );
}

export default Product;