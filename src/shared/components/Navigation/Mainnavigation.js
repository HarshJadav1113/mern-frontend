import React, { useState } from "react";
import { Link } from "react-router-dom";
import Mainheader from "./Mainheader";
import Navlinks from "./Navlinks";
import Sidedrawer from "./Sidedrawer";
import Backdrop from "../UIComponents/Backdrop";
import "./Mainnavigation.css";

const Mainnavigation = (props) => {
  const [drawerisopen, setdrawerisopen] = useState(false);

  const opendrawer = () => setdrawerisopen(true);
  const closedrawer = () => setdrawerisopen(false);

  return (
    <React.Fragment>
      
      {drawerisopen && <Backdrop onClick={closedrawer} />}
      <Sidedrawer show={drawerisopen} onClick={closedrawer}>
        <nav className="main-navigation__drawer-nav">
          <Navlinks onClick={closedrawer} />
        </nav>
      </Sidedrawer>

      <Mainheader>
        <button className="main-navigation__menu-btn" onClick={opendrawer}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Yourplace</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <Navlinks />
        </nav>
      </Mainheader>
    </React.Fragment>
  );
};

export default Mainnavigation;