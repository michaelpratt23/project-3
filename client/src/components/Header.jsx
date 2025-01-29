import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1>Task Manager</h1>
        <nav className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <button onClick={() => localStorage.removeItem("id_token") && window.location.reload()}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;