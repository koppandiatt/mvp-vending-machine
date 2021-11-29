import _ from "lodash";
import bcrypt from "bcrypt";
import User from "./../models/user.js";
import Role from "../models/role.js";

export default {
  create: async (req, res) => {
    // Check if username already exists in the database
    let user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send("Username already registered!");

    // Check if the given role is valid
    let role = await Role.findById(req.body.role);
    if (!role)
      return res
        .status(400)
        .send("The given Role does not exists in the Database!");

    user = new User(_.pick(req.body, ["username", "password", "role"]));
    // Crypt the plain text password
    user.password = await cryptPassword(user.password);
    await user.save();

    const token = user.generateAuthToken();

    res
      .header("Authorization", `Bearer ${token}`)
      .send(_.pick(user, ["_id", "username", "role"]));
  },
  // for this endpoint user has to be authenticated
  // so we will set the current user in request parameter
  changePassword: async (req, res) => {
    let { user } = req;
    user.password = await cryptPassword(req.body.password);
    await user.save();

    const token = user.generateAuthToken();

    res
      .header("Authorization", `Bearer ${token}`)
      .send(_.pick(user, ["_id", "username", "role"]));
  },
  // for this endpoint user has to be authenticated
  // so we will set the current user in request parameter
  delete: async (req, res) => {
    await req.user.delete();
    return res.send(req.user);
  },
  // for this endpoint user has to be authenticated
  // so we will set the current user in request parameter
  deposit: async (req, res) => {
    let { user } = req;
    user.deposit += req.body.deposit;

    await user.save();

    res.send({ deposit: user.deposit });
  },
};

async function cryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}
