import Skeleton from "react-loading-skeleton";
import { useSelector, useDispatch } from 'react-redux';
import { delCart } from '../../../redux/action';

const FittingCart = () => {
    const state = useSelector((state) => state.HandleCart)
    const dispatch = useDispatch()

    const handleDel = (item) => {
        dispatch(delCart(item))
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

    const ShowProducts = (product) => {
        return (
            <>
                <div className="col-md-12 mb-4">
                    <div className="card h-100 text-center p-4" key={product.id}>
                        <img src={product.image} className="card-img-top" alt={product.title} height="250px" />
                        <div className="card-body">
                            <h5 className="card-title mb-0">{product.title.substring(0, 12)}...</h5>
                            <p className="card-text lead fw-bold">{product.price} €</p>
                            <div className="buttons justify-content-center d-flex my-4">
                                {["S", "M", "L", "XL"].map((size) => {
                                    return (
                                        <button className="btn btn-outline-dark me-2">{size}</button>
                                    );
                                })}
                            </div>
                            <div className="buttons justify-content-center d-flex colors my-4">
                                {["red", "blue", "green", "black"].map((color) => {
                                    return (
                                        <button className="btn btn-outline-dark me-2" style={{ background: color }}></button>
                                    );
                                })}
                            </div>
                            <button className="btn btn-outline-dark px-4 py-2">Essayer</button>
                            <button className="btn btn-dark ms-2 px-3 py-2" onClick={()=>handleDel(product)}>Retirer du panier</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }


    return (
        <div>
            <div className="container my-5">
                <div className="overflow-auto" style={{ "max-width": "400px", "max-height": "500px" }}>
                    <div className="text-center mb-2 pb-3">
                        <h2>Mon Panier</h2>
                    </div>
                    {state.length === 0 && emptyCart()}
                    {state.length !== 0 && state.map(ShowProducts)}
                </div>
            </div>
        </div>
    );
}

export default FittingCart;