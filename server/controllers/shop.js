import mongoose from "mongoose";
import _ from "lodash";
import winston from "winston";
import Product from "../models/product.js";
import { COINS } from "../constants/coins.js";
import { getChangeArray } from "../utils/getChangeArray.js";
import User from "../models/user.js";

const BUYER = "buyer";

export default {
  /* 
    for this endpoint user has to be authenticated
    so we will set the current user in request parameter

    The endpoint accepts the following body:
    {
      "productId": "ObjectId",
      "amount": "number"
    }

  */
  buy: async (req, res) => {
    const { productId, amount: quantity } = req.body;
    const { user } = req;
    let product = await Product.findById(productId);

    if (!product)
      return res
        .status(404)
        .send("The product does not exists in the database!");

    if (!product.amountAvailable)
      return res.status(404).send("This product is not available anymore!");

    if (product.amountAvailable < quantity)
      return res.status(400).send({
        error: "The required amount is not available anymore!",
        data: _.pick(product, ["_id", "amountAvailable"]),
      });

    const { deposit } = user;
    const amountSpent = product.cost * quantity;
    if (amountSpent > deposit) {
      return res.status(400).send({
        error: "The cost of the products exceeds your budget!",
      });
    }

    // In case that something goes wrong we use a transaction
    // to reset User deposit and the product remaining amount
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      product = await Product.findByIdAndUpdate(
        product._id,
        { $inc: { amountAvailable: -quantity } },
        { new: true }
      );

      await User.findByIdAndUpdate(user._id, {
        deposit: 0,
      });

      await session.commitTransaction();
      session.endSession();

      const changeArray = getChangeArray(deposit - amountSpent, COINS);

      res.send({
        amountSpent,
        amountOrdered: quantity,
        product: {
          ..._.pick(product, ["productName", "cost", "amountAvailable"]),
        },
        change: changeArray,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      winston.error(
        `Something failed while buying products! ${JSON.stringify(error)}`
      );

      return res.status(500).send({
        error: "Something failed on the server! Please try again!",
      });
    }
  },
};
