import React, { useEffect, useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
import { Alert, Button, FormControl, Stack } from "react-bootstrap";

import { hideProductModal } from "../../slices/settings/settingSlice";
import {
  createProduct,
  editProduct,
  productState,
  updateProduct,
} from "../../slices/product/productSlice";
import { COINS } from "./../../constants/coins";

const ProductForm = () => {
  const dispatch = useDispatch();
  const { selected } = useSelector(productState);

  const [productName, setProductName] = useState("");
  const [cost, setCost] = useState(5);
  const [amountAvailable, setAmountAvailable] = useState(0);

  useEffect(() => {
    if (selected) {
      setProductName(selected.productName);
      setCost(selected.cost);
      setAmountAvailable(selected.amountAvailable);
    }
  }, []);

  const [errors, setErrors] = useState("");

  const doSubmit = () => {
    const product = {
      productName,
      cost,
      amountAvailable,
    };
    if (validateForm(product)) {
      if (selected) {
        dispatch(updateProduct({ ...product, _id: selected._id }));
      } else {
        dispatch(createProduct(product));
      }
      dispatch(editProduct(null));
      dispatch(hideProductModal());
    }
  };

  const firstCoin = _.sortBy(COINS)[0];
  const schema = Joi.object({
    productName: Joi.string().min(3).max(255).required(),
    cost: Joi.number().min(firstCoin).multiple(firstCoin).required(),
    amountAvailable: Joi.number().min(0).required(),
  });

  const validateForm = (user) => {
    const { error } = schema.validate(user);
    if (error) {
      setErrors(error.message);
      console.log(error);
      return false;
    }
    setErrors("");
    return true;
  };

  return (
    <Stack gap={4} className="col-md-8 my-5 mx-auto">
      <FormControl
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        type="text"
        placeholder="Product Name"
        required
      />
      <FormControl
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        type="number"
        placeholder="Cost"
        required
      />

      <FormControl
        value={amountAvailable}
        onChange={(e) => setAmountAvailable(e.target.value)}
        type="number"
        placeholder="Amount Available"
        required
      />

      {errors && <Alert variant="danger">{errors}</Alert>}

      <Button variant="primary" onClick={doSubmit}>
        {selected ? "Edit Product" : "Create Product"}
      </Button>
      <Button
        variant="outline-secondary"
        onClick={() => {
          dispatch(editProduct(null));
          dispatch(hideProductModal());
        }}
      >
        Cancel
      </Button>
    </Stack>
  );
};

export default ProductForm;
