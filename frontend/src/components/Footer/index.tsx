import React from "react";
import "./index.css";

const Footer: React.FC = () => {
  const d = new Date();
  return <div className="footer">Bio web App ©{d.getFullYear()}</div>;
};

export default Footer;
