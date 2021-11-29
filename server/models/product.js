import Joi from "joi";
import mongoose from "mongoose";
import { MODELS } from "../constants/models.js";

const { model, Schema } = mongoose;

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  cost: {
    type: Number,
    min: 0,
    required: true,
  },
  amountAvailable: {
    type: Number,
    min: 0,
    default: 0,
  },
  seller: {
    type: Schema.ObjectId,
    ref: MODELS.USER,
    required: true,
  },
});

const Product = model(MODELS.PRODUCT, productSchema);

export function validateProduct(product) {
  const schema = Joi.object({
    productName: Joi.string().min(3).max(1000000).required(),
    cost: Joi.number().min(0).multiple(5).required(),
    amountAvailable: Joi.number().min(0).required(),
    seller: Joi.objectId(),
  });

  return schema.validate(product);
}

export default Product;
