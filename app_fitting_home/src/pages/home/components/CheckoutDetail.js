import React from 'react'
import { useSelector } from 'react-redux'

const CheckoutDetail = () => {
    const state = useSelector((state) => state.HandleCart)

    var total = 0;
    const productList = (product) => {
        total = total + product.price;
        return (
            <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6 className="my-0">{product.title}</h6>
                </div>
                <span className="text-muted">{product.price} €</span>
            </li>
        );
    }

    return (
        <>
            <div className="container my-5">
                <div className="row g-5">
                    <div className="col-md-5 col-lg-4 order-md-last">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-primary">Mon panier</span>
                            <span className="badge bg-primary rounded-pill">{state.length}</span>
                        </h4>
                        <ul className="list-group mb-3">
                            {state.map(productList)}

                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total (EUR)</span>
                                <strong>{total} €</strong>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-7 col-lg-8">
                        <h4 className="mb-3">Adresse de facturation</h4>
                        <form className="needs-validation" novalidate="">
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label htmlFor="firstName" className="form-label">Prénom</label>
                                    <input type="text" className="form-control" id="firstName" placeholder="" value="" required="" />
                                    <div className="invalid-feedback">
                                        Prénom obligatoire.
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <label htmlFor="lastName" className="form-label">Nom</label>
                                    <input type="text" className="form-control" id="lastName" placeholder="" value="" required="" />
                                    <div className="invalid-feedback">
                                        Nom obligatoire.
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
                                    <div className="input-group has-validation">
                                        <span className="input-group-text">@</span>
                                        <input type="text" className="form-control" id="username" placeholder="Username" required="" />
                                        <div className="invalid-feedback">
                                            Votre nom d'utilisateur est obligatoire.
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">Email <span className="text-muted">(Optionel)</span></label>
                                    <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                                    <div className="invalid-feedback">
                                        Entrez une adresse email valide.
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="address" className="form-label">Adresse</label>
                                    <input type="text" className="form-control" id="address" placeholder="1234 Main St" required="" />
                                    <div className="invalid-feedback">
                                        Entrez une adresse de livraison.
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="address2" className="form-label">Adresse 2 <span className="text-muted">(Optionel)</span></label>
                                    <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" />
                                </div>

                                <div className="col-md-5">
                                    <label htmlFor="country" className="form-label">Pays</label>
                                    <select className="form-select" id="country" required="">
                                        <option value="">Sélectionnez...</option>
                                        <option>France</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Sélectionnez un pays valide.
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="zip" className="form-label">Code Postal</label>
                                    <input type="text" className="form-control" id="zip" placeholder="" required="" />
                                    <div className="invalid-feedback">
                                        Code Postal obligatoire.
                                    </div>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="same-address" />
                                <label className="form-check-label" htmlFor="same-address">L'adresse de livraison est la même que l'adresse de facturation</label>
                            </div>

                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="save-info" />
                                <label className="form-check-label" htmlFor="save-info">Enregistrer ces informations pour une prochaine fois</label>
                            </div>

                            <hr className="my-4" />

                            <h4 className="mb-3">Paiement</h4>

                            

                            <hr className="my-4" />

                            <button className="w-100 btn btn-primary btn-lg" type="submit">Procéder au paiement</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckoutDetail;