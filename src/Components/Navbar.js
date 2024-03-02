import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  let location = useLocation();

  const navigateToHome = (e) => {
    e.preventDefault();
    navigate("/");
  }
  const navigateToAbout = (e) => {
    e.preventDefault();
    navigate("/about");
  }
  const navigateToLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  }
  const navigateToSignUp = (e) => {
    e.preventDefault();
    navigate("/signup");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" onClick={navigateToHome}>i-Notebook</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className={`nav-link ${location.pathname === "/" ? "active" : " "}`} aria-current="page" href="#" onClick={navigateToHome}>Home</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${location.pathname === "/about" ? "active" : " "}`} href="#" onClick={navigateToAbout}>About</a>
              </li>

            </ul>
            <form className="d-flex" role="search">
              <button className="btn btn-outline-success mx-3" type="submit" onClick={navigateToLogin}>Login</button>
              <button className="btn btn-outline-success" type="submit" onClick={navigateToSignUp}>Sign Up</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
