import JWT from "jsonwebtoken";
import { getToken } from "../utils/getToken.js";
import User from "./../models/user.js";

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
            .status(400)
            .send("The given User does not exists in the Database!");
        req.user = user;
        next();
      }
    );
  },
  hasRole: (role) => {
    return async (req, res, next) => {
      const user = await User.findById(req.user._id).populate({ path: "role" });
      if (role !== user.role.name)
        return res.status(401).send(`Access denied. You are not a ${role}!`);
      next();
    };
  },
};
