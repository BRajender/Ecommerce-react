import React from "react";
import { Modal, Button } from "react-bootstrap";

function PrimaryModal(props) {
  const handleClose = () => {
    props.handleclose();
  };
  return (
    <Modal {...props}>
      <div className="modal-header-div d-flex justify-content-center">
        <p className="modal-header-text mb-0">{props.edit ? "EDIT" : "ADD"}</p>
        <Button className="modal-close-btn p-0">
          <img
            src="/images/close.png"
            alt="close"
            className="close-img"
            onClick={() => handleClose()}
          />
        </Button>
      </div>
      <div className="modal_body_wrapper">
        <div className="modal_body_container">{props.children}</div>
      </div>
    </Modal>
  );
}

export default PrimaryModal;
