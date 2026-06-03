import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import logo from "../assets/logo.png/"

function NavBar() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={goHome}>
        <img src={logo} alt="logo" className="nav-logo" />
      </div>

      <div className="navbar-links">
        <span className="nav-link" onClick={goHome}>
          Home
        </span>

        <Link to="/favorites" className="nav-link">
          Favorites
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
