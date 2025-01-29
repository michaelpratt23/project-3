import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Task Manager. All rights reserved.</p>
    </footer>
  );
};

export default Footer;