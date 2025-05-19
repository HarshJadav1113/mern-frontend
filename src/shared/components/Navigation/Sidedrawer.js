import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./Sidedrawer.css";

const Sidedrawer = (props) => {
  const drawerRef = React.useRef(null);

  const content = (
    <aside 
      className="side-drawer" 
      onClick={props.onClick}
      ref={drawerRef}
    >
      {props.children}
    </aside>
  );

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      timeout={5000}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
      nodeRef={drawerRef}
    >
      {content}
    </CSSTransition>,
    document.getElementById("drawer-hook")
  );
};

export default Sidedrawer;