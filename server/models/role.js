import mongoose from "mongoose";
import { MODELS } from "../constants/models.js";

const { model, Schema } = mongoose;

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Role = model(MODELS.ROLE, roleSchema);

export default Role;
