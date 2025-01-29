import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../utils/auth";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Auth.logout();
    navigate("/login"); // Redirect to login on logout
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1>Task Manager</h1>
        <nav className="nav-links">
          {Auth.loggedIn() ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;