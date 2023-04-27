import "../../../style/App.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../../../redux/action";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import AlertRight from "../../../component/alert/AlertRight";
import { Typography } from "@mui/material";
import Viewport3D from "../../threejs/Viewport3D";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [garmentId, setGarmentId] = useState();
  const [filename, setFilename] = useState("");
  const [simulateFilename, setSimulateFilename] = useState();

  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCart(product));
    setOpen(true);
  };

  useEffect(() => {
    
    return () => {
      if (!product) return
      console.log({product})
    }
  }, [product])

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(
        `http://91.172.40.53:8080/garmentCollection?id=${id}`
      );
      setProduct(await response.json());
      setLoading(false);
    };
    getProduct();
  }, [id]);

  useEffect(() => {
    const findGarmentId = () => {
      var selectedColor = color ? color : colors[0];
      var selectedSize = size ? size : sizes[0];

      product?.garments?.forEach((garment) => {
        if (garment.color === selectedColor && garment.size === selectedSize) {
          setGarmentId(garment._id);
        }
      });
    };
    if (!product) {
      return;
    }
    findGarmentId();
  }, [color, colors, id, product, size, sizes]);

  useEffect(() => {
    const getFilename = async () => {
      const modelId = localStorage.getItem("modelId");
      console.log({modelId});
      const payload = JSON.stringify({
        bodyId: modelId,
        garmentsIds: [garmentId],
      });

      console.log({garmentId});

      console.log("all data to post: ", payload);
      const response = await fetch("http://91.172.40.53:8080/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: payload,
      });
      const data = await response.json();
      // console.log("data: ", data.filename);
      console.log({data});
      setSimulateFilename(data.filename);
      localStorage.setItem("simulateFilename", data.filename);
    };

    if (garmentId) getFilename();
  }, [garmentId]);

  useEffect(() => {
    const modelFilename = localStorage.getItem("modelFilename");
    // const simulateFilename = localStorage.getItem("simulateFilename");
    if (!simulateFilename) {
      setFilename(modelFilename);
    } else {
      setFilename(simulateFilename);
    }
  }, [simulateFilename]);

  const setDetails = () => {
    product?.garments?.forEach((garment) => {
      if (!colors.includes(garment.color)) {
        colors.push(garment.color);
      }
      if (!sizes.includes(garment.size)) {
        sizes.push(garment.size);
      }
    });
  };

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
    setDetails();
    return (
      <div>
        <h4 className="text-uppercase text-black-50">{product.type}</h4>
        <h1 className="display-5">{product.name}</h1>
        <h3 className="display-6 fw-bold my-4">{product.price} €</h3>
        <div className="buttons d-flex my-4">
          {sizes.map((s) => {
            const isActive = s === size ? "active" : "";
            return (
              <button
                id={s}
                key={s}
                className={"btn btn-outline-dark me-2 " + isActive}
                onClick={(e) => setSize(e.target.id)}
              >
                {s}
              </button>
            );
          })}
        </div>
        <div className="buttons d-flex colors my-4">
          {colors.map((c) => {
            const isActive = c === color ? "active" : "";
            return (
              <button
                id={c}
                key={c}
                className={"color btn me-2 " + isActive}
                style={{ background: c }}
                onClick={(e) => setColor(e.target.id)}
              ></button>
            );
          })}
        </div>
        <button
          className="btn btn-outline-dark px-4 py-2"
          onClick={() => addProduct(product)}
        >
          Ajouter au panier
        </button>
        <NavLink to="/shopping-cart" className="btn btn-dark ms-2 px-3 py-2">
          Aller au panier
        </NavLink>
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
    <div className="row py-4">
      <div className="col-md-6">
        <Viewport3D url={filename} />
      </div>
      <div className="col-md-6">{loading ? <Loading /> : <ShowProduct />}</div>
    </div>
  );
};

export default Product;
