import _ from "lodash";
import bcrypt from "bcrypt";
import Product from "../models/product.js";
import User from "./../models/user.js";

const SELLER = "seller";

export default {
  list: async (req, res) => {
    const products = await Product.find()
      .populate({ path: "seller", select: "_id username" })
      .select({ __v: 0 });
    res.send(products);
  },
  create: async (req, res) => {
    // Check if the user
    let user = await User.findById(req.body.seller).populate({ path: "role" });
    if (!user)
      return res
        .status(400)
        .send("The given User does not exists in the Database!");

    // Check if the user role is Seller
    if (user.role.name !== SELLER) {
      return res.status(401).send("You are not allowed to create products!");
    }

    const product = new Product(
      _.pick(req.body, ["productName", "cost", "amountAvailable", "seller"])
    );

    await product.save();

    res.send(product);
  },
  get: async (req, res) => {},
  update: async (req, res) => {},
  delete: async (req, res) => {},
  buy: async (req, res) => {},
};
