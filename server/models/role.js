import mongoose from "mongoose";

const { model, Schema } = mongoose;

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Role = model("Role", roleSchema);

export default Role;
