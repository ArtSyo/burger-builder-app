import React from "react";
import BackDrop from "../BackDrop/BackDrop";
import "./Modal.css";

const Modal = (props) => {
  return (
    <>
      <BackDrop show={props.show} clicked={props.modalClosed}/>
      <div
        className="Modal"
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
      ;
    </>
  );
};

export default Modal;
