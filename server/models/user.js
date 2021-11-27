import Joi from "joi";
import joiPassword from "joi-password";
import { model, Schema } from "mongoose";

const userSchema = new Schema({
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
    ref: "Role",
    required: true,
  },
});

const User = model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(6).max(50).required(),
    password: joiPassword
      .string()
      .minOfUppercase(1)
      .minOfNumeric(1)
      .minOfSpecialCharacters(1)
      .noWhiteSpaces()
      .required(),
    password_confirmation: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .options({ messages: { "any.only": "{{#label}} does not match!" } }),
    deposit: Joi.number(),
    role: Joi.objectId().required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.userSchema = userSchema;
exports.validate = validateUser;
