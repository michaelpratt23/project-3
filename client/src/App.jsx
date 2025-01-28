import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard"; // Import the Dashboard page
import Login from "./pages/Login";         // Import the Login page
import Signup from "./pages/Signup";       // Import the Signup page
import Header from "./components/Header";  // Import the Header component
import Footer from "./components/Footer";  // Import the Footer component

const App = () => {
  return (
    <Router>
      <Header /> {/* Render the Header */}
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} /> {/* Dashboard as default route */}
          <Route path="/login" element={<Login />} /> {/* Login page */}
          <Route path="/signup" element={<Signup />} /> {/* Signup page */}
        </Routes>
      </main>
      <Footer /> {/* Render the Footer */}
    </Router>
  );
};

export default App;