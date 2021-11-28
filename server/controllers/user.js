import _ from "lodash";
import bcrypt from "bcrypt";
import User, { validateUser } from "./../models/user.js";

export default {
  create: async (req, res) => {
    // Check if username already exists in the database
    let user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send("Username already registered!");

    user = new User(_.pick(req.body, ["username", "password", "role"]));
    // Crypt the plain text password
    user.password = await cryptPassword(user.password);
    await user.save();

    res.send(_.pick(user, ["_id", "username", "role"]));
  },
};

async function cryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}
