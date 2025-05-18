import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import { CSSTransition } from "react-transition-group";
import Backdrop from "./Backdrop";

const Modaloverlay = (props) => {
  const content = (
    <div className={`modal ${props.classname}`} style={props.style}>
      <header className={`modal__header ${props.headerclass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onsubmit ? props.onsubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentclass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerclass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  const nodeRef = React.useRef(null);
  
  return (
    <React.Fragment>
      {props.show && <Backdrop onclick={props.oncancel} />}
      <CSSTransition
        in={props.show}
        nodeRef={nodeRef}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <div ref={nodeRef}>
          <Modaloverlay {...props} />
        </div>
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;