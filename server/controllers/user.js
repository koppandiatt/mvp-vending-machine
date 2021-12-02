import _ from "lodash";
import bcrypt from "bcrypt";
import User from "./../models/user.js";
import Role from "../models/role.js";
import Product from "../models/product.js";
import mongoose from "mongoose";
import winston from "winston";

const { ObjectId } = mongoose.Types;

export default {
  profile: async (req, res) => {
    let user = await User.findById(req.user._id)
      .populate({ path: "role", select: "_id name" })
      .select("_id username deposit role");
    if (!user) return res.status(404).send({ error: "User not found!" });

    res.send(user);
  },
  create: async (req, res) => {
    const { username, password, role: roleName } = req.body;
    // Check if username already exists in the database
    let user = await User.findOne({ username: username });
    if (user)
      return res.status(400).send({ error: "Username already registered!" });

    // Check if the given role is valid
    const role = await Role.findOne({ name: roleName });
    if (!role)
      return res
        .status(400)
        .send({ error: "The given Role does not exists in the Database!" });

    user = new User({
      username,
      password,
      role: role._id,
    });
    // Crypt the plain text password
    user.password = await cryptPassword(user.password);
    await user.save();

    user.role = role;

    const token = user.generateAuthToken();

    res.send(token);
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

  products: async (req, res) => {
    let { user } = req;
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const search = req.query.search || "";
    const seller_id = user._id;

    const query = {
      productName: {
        $regex: `.*${search}.*`,
        $options: "i",
      },
      seller: seller_id,
    };

    const options = {
      populate: { path: "seller", select: "_id username" },
      limit,
      page,
    };
    const products = await Product.paginate(query, options);
    res.send(products);
  },
};

async function cryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}
