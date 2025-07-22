import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold" to="/">
        🛫 Flight360
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse justify-content-between"
        id="navbarNav"
      >
     <div className="w-100 d-flex justify-content-center fw-bold">
           <ul className="navbar-nav d-flex justify-content-center">
          {token && (
            <>
              <li className="nav-item ms-4">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>

              <li className="nav-item ms-4">
                <Link className="nav-link" to="/Flights">
                  Flights
                </Link>
              </li>

              <li className="nav-item ms-4">
                <Link className="nav-link" to="/Mybooking">
                  My Bookings
                </Link>
              </li>

              {role === "admin" && (
                <li className="nav-item ms-4">
                  <Link className="nav-link" to="/Admindashbord">
                    Admin Dashboard
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>
     </div>

        <ul className="navbar-nav">
          {!token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/Register">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item me-5">
                <span className="nav-link text-info  ">Role: {role}</span>
              </li>
              <li className="nav-item ms-2">
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger btn-sm mt-3"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
