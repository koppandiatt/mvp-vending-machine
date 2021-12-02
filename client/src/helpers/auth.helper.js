import jwtDecode from "jwt-decode";

const tokenKey = "JWT_TOKEN";

const saveJWT = (jwt) => {
  localStorage.setItem(tokenKey, jwt);
};

const removeJWT = () => {
  localStorage.removeItem(tokenKey);
};

const getJwt = () => {
  return localStorage.getItem(tokenKey);
};

const getUserData = () => {
  try {
    const jwt = jwtDecode(getJwt());
    return jwt.user;
  } catch (ex) {
    return null;
  }
};

const axiosConfig = {
  headers: {
    Authorization: `Bearer ${getJwt()}`,
    "Content-Type": "application/json",
  },
};

const authHelper = {
  saveJWT,
  removeJWT,
  getJwt,
  getUserData,
  axiosConfig,
};

export default authHelper;
