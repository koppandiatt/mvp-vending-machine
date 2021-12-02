import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import {
  hideProductModal,
  settingsState,
} from "../../slices/settings/settingSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductForm from "../forms/ProductForm";

const ProductModal = () => {
  const dispatch = useDispatch();
  const { showProductForm } = useSelector(settingsState);

  return (
    <Modal
      show={showProductForm}
      onHide={() => dispatch(hideProductModal())}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProductForm />
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
