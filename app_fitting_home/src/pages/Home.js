import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <h1>Home</h1>
      <nav>
        <ul>
          <li>
            <Link to="/login">login</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
export default Home;
