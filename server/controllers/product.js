import _ from "lodash";
import Product from "../models/product.js";

export default {
  list: async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const search = req.query.search || "";

    const query = search
      ? {
          productName: {
            $regex: `.*${search}.*`,
            $options: "i",
          },
        }
      : {};

    const options = {
      populate: { path: "seller", select: "_id username" },
      limit,
      page,
    };
    const products = await Product.paginate(query, options);
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
    if (!req?.product) return res.status(404).send("Product not found!");

    let { product } = req;

    product.productName = req.body.productName;
    product.cost = req.body.cost;
    product.amountAvailable = req.body.amountAvailable;

    await product.save();

    return res.send(
      _.pick(product, ["_id", "productName", "cost", "amountAvailable"])
    );
  },
  delete: async (req, res) => {
    if (!req?.product) return res.status(404).send("Product not found!");
    await req.product.delete();
    res.send(req.product);
  },
};
