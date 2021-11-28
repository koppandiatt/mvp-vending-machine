import mongoose from "mongoose";

const { model, Schema } = mongoose;

export const roleSchema = new Schema({
  role: {
    type: String,
    required: true,
  },
});

const Role = model("Role", roleSchema);

export default Role;
