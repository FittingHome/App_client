import "./style/App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/pages/Login";
import Register from "./pages/login/pages/Register";
import Home from "./pages/Home";
import AvatarCreation from "./pages/login/pages/AvatarCreation";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/avatar" element={<AvatarCreation />} />
      </Routes>
    </>
  );
}

export default App;
