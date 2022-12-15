import { Link } from "react-router-dom";
import "../../style/form.css";

function Login() {
  return (
    <>
      <h1>login</h1>
      <div>
        <div className="bg-illustration"></div>
      </div>
      <div className="login">
        <div className="container">
          <h1 className="title">Connexion</h1>
          <h2>FittingHome, le mannequin c’est vous !</h2>
          <div className="login-form">
            <form onsubmit="return login()" action="">
              <label for="email">
                <b>Email</b>
              </label>
              <input type="email" id="email" placeholder="E-mail Address" />
              <label for="psw">
                <b>Mot de passe</b>
              </label>
              <input type="password" id="password" placeholder="Password" />

              <div className="forget-pass">
                <a href="forgot-password.html">Forgot Password ?</a>
              </div>

              <div className="btn_form">
                <button type="submit">Se connecter</button>
                <button>
                  <Link to="/register">Home</Link>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
export default Login;
