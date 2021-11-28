import Joi from "joi";
import joiObjectId from "joi-objectid";

function customJoi() {
  Joi.objectId = joiObjectId(Joi);
}

export default customJoi;
