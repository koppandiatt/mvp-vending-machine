import http from "../../services/http.service";

const API_URL = process.env.REACT_APP_API_URL + "/auth";

const authApi = {
  login: (credentials) => {
    return http.post(API_URL, credentials);
  },
};

export default authApi;
