import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";

const Products = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch("http://91.172.40.53:8080/garmentCollection/all");

            if (componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
                console.log(filter);
            }

            return () => {
                componentMounted = false;
            }
        }

        getProducts();
    }, []);

    const Loading = () => {
        return (
            <>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
            </>
        );
    }


    const FilterProduct = (cat) => {
        const updateList = data.filter((x) => x.type === cat);

        setFilter(updateList);
    }

    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <button className="btn btn-outline-dark me-2" onClick={() => setFilter(data)}>Tout</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => FilterProduct("top")}>Haut</button>
                    <button className="btn btn-outline-dark me-2" onClick={() => FilterProduct("bottom")}>Bas</button>
                </div>
                {filter.map((product) => {
                    return (
                        <div key={product.name} className="col-md-3 mb-4">
                            <div className="card h-100 text-center p-4" key={product._id}>
                                <img crossOrigin="anonymous" src={`http://91.172.40.53:8080/image?id=${product.imagePath.substring(0, 36)}`} className="card-img-top" alt={product.name} height="250px" />
                                <div className="card-body">
                                    <h5 className="card-title mb-0">{product.description.substring(0, 20)}...</h5>
                                    <p className="card-text lead fw-bold">{product.price} €</p>
                                    <NavLink to={`/marketplace/${product._id}`} className="btn btn-outline-dark">Essayer</NavLink>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </>
        );
    }

    return (
        <div>
            <div className="container my-5 py-2">
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    );
}

export default Products;