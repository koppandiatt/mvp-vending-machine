import { Schema } from "mongoose";

const roleSchema = new Schema({
  role: {
    type: String,
    required: true,
  },
});

export default roleSchema;
