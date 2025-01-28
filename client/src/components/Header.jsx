import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const logout = () => {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  };

  return (
    <header>
      <h1>Task Manager</h1>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <button onClick={logout}>Logout</button>
      </nav>
    </header>
  );
};

export default Header;