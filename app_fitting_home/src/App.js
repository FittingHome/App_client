import "./style/App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/pages/Login";
import Register from "./pages/login/pages/Register";
import Home from "./pages/Home";
import AvatarCreation from "./pages/login/pages/AvatarCreation";
import Marketplace from "./pages/home/pages/Marketplace";
import FittingRoom from "./pages/home/pages/FittingRoom";
import ShoppingCart from "./pages/home/pages/ShoppingCart";
import Account from "./pages/home/pages/Account";
import ProductDetail from "./pages/home/pages/ProductDetail";
import Checkout from "./pages/home/pages/Checkout";
import StripePayment from "./pages/home/pages/StripePayment";
import StripeCompletion from "./pages/home/pages/StripeCompletion";
import AR from "./pages/home/pages/AR";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/avatar" element={<AvatarCreation />} />
        <Route path="/fitting-room" element={<FittingRoom />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/marketplace/:id" element={<ProductDetail />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/account" element={<Account />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<StripePayment />} />
        <Route path="/completion" element={<StripeCompletion />} />
        <Route path="/ar-view" element={<AR />} />
      </Routes>
    </>
  );
}

export default App;
