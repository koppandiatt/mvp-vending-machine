import authHelper from "../../helpers/auth.helper";
import http from "../../services/http.service";

const API_URL = process.env.REACT_APP_API_URL;

const authApi = {
  login: (credentials) => {
    const URL = API_URL + "/auth";
    return http.post(URL, credentials);
  },
  register: (user) => {
    const URL = API_URL + "/users";
    return http.post(URL, user);
  },
  profile: () => {
    const URL = API_URL + "/users/profile";
    return http.get(URL, authHelper.axiosConfig());
  },
  deposit: (coin) => {
    const URL = API_URL + "/users/deposit";
    return http.patch(URL, { deposit: coin }, authHelper.axiosConfig());
  },
  reset_deposit: () => {
    const URL = API_URL + "/users/reset";
    return http.patch(URL, {}, authHelper.axiosConfig());
  },
};

export default authApi;
