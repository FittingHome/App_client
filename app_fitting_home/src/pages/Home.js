import { Link } from "react-router-dom";
import Navbar from "./login/components/Navbar";

function Home() {
  return (
    <>
      <h1>Home</h1>
      <nav>
        <ul>
          <Navbar></Navbar>
          <li>
            <Link to="/login">login</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
export default Home;
