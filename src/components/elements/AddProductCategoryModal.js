import React from "react";
import { Modal, Button } from "react-bootstrap";
import { CategoryForm } from "../forms";

function AddProductCategoryModal(props) {
  const handleClose = () => {
    props.handleclose();
  };

  return (
    <Modal {...props}>
      <div className="modal-header-div d-flex justify-content-center">
        <p className="modal-header-text mb-0">ADD CATEGORY</p>
        <Button className="modal-close-btn p-0">
          <img
            src="/images/close.png"
            alt="close"
            className="close-img"
            onClick={() => handleClose()}
          />
        </Button>
      </div>
      <Modal.Body>
        <CategoryForm handleclose={handleClose} />
      </Modal.Body>
    </Modal>
  );
}

export default AddProductCategoryModal;
