import React from "react";
import BackDrop from "../BackDrop/BackDrop";
import "./Modal.css";

class Modal extends React.Component {

shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
}

  render() {
    return (
      <>
        <BackDrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className="Modal"
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </>
    );
  }
}

export default Modal;
