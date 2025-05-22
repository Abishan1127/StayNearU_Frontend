import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import Logo from "../../assets/logo-removebg-preview.png";

interface NavigationProps {
  authenticated: boolean;
  handleLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ authenticated, handleLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="main">
      <img src={Logo} alt="Logo" className="logo" />
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <nav className={`navbar ${mobileMenuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li><Link to="/" className="nav-item" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/about" className="nav-item" onClick={toggleMenu}>About</Link></li>
          <li><Link to="/contact" className="nav-item" onClick={toggleMenu}>Contact</Link></li>

          {!authenticated ? (
            <>
              <li><Link to="/register" className="nav-item" onClick={toggleMenu}>Register</Link></li>
              <li><Link to="/login" className="nav-item" onClick={toggleMenu}>Login</Link></li>
            </>
          ) : (
            <li>
              <button className="logout-button" onClick={() => { handleLogout(); toggleMenu(); }}>Sign Out</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
