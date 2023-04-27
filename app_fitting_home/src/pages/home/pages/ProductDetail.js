import Navbar from "../components/Navbar";
import Product from "../components/Product";
import { useEffect, useState } from "react";

function ProductDetail() {
  return (
    <div>
      <Navbar />
      <div className="container py-5">
            <Product />
      </div>
    </div>
  );
}

export default ProductDetail;
