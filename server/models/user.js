import Joi from "joi";
import JWT from "jsonwebtoken";
import mongoose from "mongoose";
import PasswordComplexity from "joi-password-complexity";
import { COINS } from "../constants/coins.js";
import { MODELS } from "../constants/models.js";

const { model, Schema } = mongoose;

export const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  deposit: {
    type: Number,
    default: 0,
  },
  role: {
    type: Schema.ObjectId,
    ref: MODELS.ROLE,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  return JWT.sign(
    {
      user: {
        _id: this._id,
        username: this.username,
        deposit: this.deposit,
        role: this.role,
      },
    },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: "1d" }
  );
};

const User = model(MODELS.USER, userSchema);

export function validateUser(user) {
  const passwordComplexity = {
    min: 6,
    max: 255,
    upperCase: 1,
    numeric: 1,
    requirementCount: 2,
  };

  const schema = Joi.object({
    username: Joi.string().min(6).max(50).required(),
    password: new PasswordComplexity(passwordComplexity).required(),
    password_confirmation: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .options({ messages: { "any.only": "{{#label}} does not match!" } }),
    deposit: Joi.number(),
    role: Joi.string().required(),
  });

  return schema.validate(user);
}

export function validatePassword(body) {
  const passwordComplexity = {
    min: 6,
    max: 255,
    upperCase: 1,
    numeric: 1,
    requirementCount: 2,
  };

  const schema = Joi.object({
    password: new PasswordComplexity(passwordComplexity).required(),
    password_confirmation: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .options({ messages: { "any.only": "{{#label}} does not match!" } }),
  });

  return schema.validate(body);
}

export function validateDeposit(body) {
  const schema = Joi.object({
    deposit: Joi.number()
      .valid(...COINS)
      .required(),
  });

  return schema.validate(body);
}

export default User;
