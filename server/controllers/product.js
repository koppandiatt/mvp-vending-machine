import _ from "lodash";
import Product from "../models/product.js";

export default {
  list: async (req, res) => {
    const products = await Product.find()
      .populate({ path: "seller", select: "_id username" })
      .select({ __v: 0 });
    res.send(products);
  },
  create: async (req, res) => {
    const product = new Product({
      productName: req.body.productName,
      cost: req.body.cost,
      amountAvailable: req.body.amountAvailable,
      seller: req.user._id,
    });

    await product.save();

    res.send(product);
  },
  get: async (req, res) => {
    const product = await Product.findById(req.params.id)
      .populate({ path: "seller", select: "_id username" })
      .select("-__v");
    if (!product)
      return res
        .status(404)
        .send("The product with the given ID was not found!");

    res.send(product);
  },
  update: async (req, res) => {
    let product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .send("The product with the given ID was not found!");

    if (!product.seller.equals(req.user._id))
      return res
        .status(404)
        .send(`Access Denied! Your are not allowed to update this product!`);

    product.productName = req.body.productName;
    product.cost = req.body.cost;
    product.amountAvailable = req.body.amountAvailable;

    product.save();

    return res.send(product);
  },
  delete: async (req, res) => {
    let product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .send("The product with the given ID was not found!");
    if (!product.seller.equals(req.user._id))
      return res
        .status(404)
        .send(`Access Denied! Your are not allowed to update this product!`);
    product.delete();
    res.send(product);
  },
};
