import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  const nodeRef = useRef();

  return (
    <>
      {props.showModal && <Backdrop setShowModal={props.setShowModal} />}
      <CSSTransition
        timeout={400}
        in={props.showModal}
        nodeRef={nodeRef}
        classNames="modals"
        mountOnEnter
        unmountOnExit
      >
        <div className="modals px-4 py-3 pt-0" ref={nodeRef}>
          <div className="mb-3">
            <h2 className="mb-0 fs-5">{props.title}</h2>
            <i
              className="bi bi-x-circle-fill fs-3"
              onClick={() => props.setShowModal(false)}
            ></i>
          </div>
          {props.children}
        </div>
      </CSSTransition>
    </>
  );
};

export default Modal;
