export function getToken(req) {
  let token = "";
  const authToken = req.header("Authorization");
  if (authToken) {
    const parts = authToken.split(" ");

    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];
      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      throw new Error(
        "Invalid authorization header format. Format is Authorization: Bearer [token]"
      );
    }
  } else {
    throw new Error("Access denied! No token provided!");
  }
  return token;
}
