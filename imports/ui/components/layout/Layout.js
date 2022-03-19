import React from "react";
// import Footer from "../footer/Footer";
import Header from "../Header/Header";

import "./style.scss";
const Layout = (props) => {
  return (
    <div className="layout">
      <Header></Header>
      <div className="layout__body">{props.children}</div>
    </div>
  );
};

export default Layout;
