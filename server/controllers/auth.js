import bcrypt from "bcrypt";
import Joi from "joi";
import User from "./../models/user.js";

export default {
  login: async (req, res) => {
    let user = await User.findOne({ username: req.body.username }).populate({
      path: "role",
    });
    if (!user) return res.status(400).send("Invalid email or password.");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();
    res.send(token);
  },
};

export function validateLogin(credentials) {
  const schema = Joi.object({
    username: Joi.string().min(6).max(50).required(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(credentials);
}
