import JWT from "jsonwebtoken";
import { getToken } from "../utils/getToken.js";
import User from "./../models/user.js";
import Product from "./../models/product.js";

export default {
  isAuthenticated: async (req, res, next) => {
    let token;
    try {
      token = getToken(req);
    } catch (error) {
      return res.status(401).send(error.message);
    }

    // Check Provided JWT Token and set the decoded user
    JWT.verify(
      token,
      process.env.JWT_PRIVATE_KEY,
      async function (err, decoded) {
        if (err) return res.status(401).send(`Access denied. ${err.message}`);
        let user = await User.findById(decoded._id).populate({ path: "role" });
        if (!user)
          return res
            .status(404)
            .send("The given User does not exists in the Database!");
        req.user = user;
        next();
      }
    );
  },
  hasRole: (roles) => {
    return async (req, res, next) => {
      if (!req?.user?._id) {
        return res.status(404).send("User not found!");
      }
      const user = await User.findById(req.user._id).populate({ path: "role" });
      if (Array.isArray(roles) && !roles.includes(user.role.name)) {
        return res
          .status(401)
          .send(`Access denied. You don't have enough privileges!`);
      } else if (user.role.name !== roles) {
        return res
          .status(401)
          .send(`Access denied. You don't have enough privileges!`);
      }
      next();
    };
  },
  isProductOwner: async (req, res, next) => {
    if (!req?.user?._id) return res.status(404).send("User not found!");

    const user = await User.findById(req.user._id).populate({ path: "role" });
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .send("The product with the given ID was not found!");
    if (!product.seller.equals(req.user._id))
      return res
        .status(404)
        .send(`Access Denied! Your are not allowed to update this product!`);
    req.product = product;
    next();
  },
};
