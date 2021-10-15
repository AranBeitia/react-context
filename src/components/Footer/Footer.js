import React from "react";

import "./Footer.scss";

function Footer({ children, ...props }) {
  return (
    <footer className="Footer bg-dark text-white mt-5" {...props}>
      &copy; {new Date().getFullYear()} Assembler School of Software Engineering
    </footer>
  );
}

export default Footer;
