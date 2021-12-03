import mongoose from "mongoose";
import _ from "lodash";
import Joi from "joi";
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
    "products": [
        {
            "productId": "p_id",
            "amount": X
        },
        ...
    ],
    "totalCost": xxx
}

  */
  buy: async (req, res) => {
    const { products, totalCost } = req.body;

    const productMap = new Map(
      products.map((obj) => [obj.productId, obj.amount])
    );
    const productIDs = products.map((p) => p.productId);
    const { user } = req;

    let dbProducts = await Product.find({ _id: { $in: productIDs } });

    if (dbProducts.length !== productIDs.length)
      return res.status(400).send({
        error: `${
          productIDs.length - dbProducts.length
        } product does not exists in the database!`,
      });

    const outOfStockProducts = dbProducts.filter(
      (p) => p.amountAvailable === 0
    );
    if (outOfStockProducts > 0)
      return res.status(400).send({
        error: `${outOfStockProducts.length} product are out of stock!`,
        data: outOfStockProducts,
      });

    const checkProductsAmount = dbProducts.filter(
      (p) => p.amountAvailable < productMap.get(p._id.toString())
    );

    if (checkProductsAmount.length > 0)
      return res.status(400).send({
        error:
          "The required amount for some products are not available anymore!",
        data: checkProductsAmount,
      });

    //Check price
    const checkDbCostOfProducts = dbProducts.reduce(function (a, b) {
      return a + b["cost"] * productMap.get(b["_id"].toString());
    }, 0);
    if (checkDbCostOfProducts !== totalCost)
      return res.status(400).send({
        error: "The total cost of the products has changed!",
        data: checkDbCostOfProducts,
      });

    const dbUser = await User.findById(user._id);
    const deposit = dbUser.deposit;
    if (totalCost > deposit) {
      return res.status(400).send({
        error: "The cost of the products exceeds your budget!",
      });
    }
    // In case that something goes wrong we use a transaction
    // to reset User deposit and the product amount
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      const updatePromises = dbProducts.map(async (product) => {
        const amountOrdered = productMap.get(product._id.toString());
        const updatedProduct = await Product.findByIdAndUpdate(
          product._id,
          {
            $inc: {
              amountAvailable: -amountOrdered,
            },
          },
          { new: true }
        );

        return {
          ..._.pick(updatedProduct, [
            "_id",
            "productName",
            "cost",
            "amountAvailable",
          ]),
          amountOrdered,
        };
      });

      const productResults = await Promise.all(updatePromises);

      await User.findByIdAndUpdate(user._id, {
        deposit: 0,
      });

      await session.commitTransaction();
      session.endSession();

      const changeArray = getChangeArray(deposit - totalCost, COINS);

      res.send({
        amountSpent: totalCost,
        products: productResults,
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
export function validateCheckOut(products) {
  const schema = Joi.object({
    products: Joi.array().items({
      productId: Joi.objectId().required(),
      amount: Joi.number().min(1).required(),
    }),
    totalCost: Joi.number().required(),
  });

  return schema.validate(products);
}
