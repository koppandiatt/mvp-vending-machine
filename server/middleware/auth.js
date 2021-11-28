import JWT from "jsonwebtoken";

export default {
  isAuthenticated: async (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).send("Access denied. No token provided.");

    // Check Provided JWT Token and set the decoded user
    JWT.verify(token, process.env.JWT_PRIVATE_KEY, function (err, decoded) {
      if (err) return res.status(401).send(`Access denied. ${err.message}`);
      req.user = decoded;
      next();
    });
  },
};
