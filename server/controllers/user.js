import _ from "lodash";
import bcrypt from "bcrypt";
import User, { validateUser } from "./../models/user.js";

export default {
  create: async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = new User(_.pick(req.body, ["username", "password", "role"]));

    user.password = await generatePassword(user.password);

    await user.save();

    res.send(_.pick(user, ["_id", "username", "role"]));
  },
};

async function generatePassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}
