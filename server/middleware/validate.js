import mongoose from "mongoose";

export default {
  body: (validator) => {
    return (req, res, next) => {
      const { error } = validator(req.body);
      if (error)
        return res.status(400).send({ error: error.details[0].message });
      next();
    };
  },
  objectID: (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(404).send({ error: "The given ID is invalid!." });
    next();
  },
};
