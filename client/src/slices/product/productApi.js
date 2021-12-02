import authHelper from "../../helpers/auth.helper";
import http from "../../services/http.service";

const API_URL = process.env.REACT_APP_API_URL;

const productApi = {
  getProducts: (page = 1, limit = 20, search = "") => {
    const URL = API_URL + "/products";
    const query = `?page=${page}&limit=${limit}&search=${search}`;
    return http.get(URL + query);
  },
  getSellerProducts: (page = 1, limit = 20, search = "") => {
    const URL = API_URL + "/users/products";
    const query = `?page=${page}&limit=${limit}&search=${search}`;
    return http.get(URL + query, authHelper.axiosConfig());
  },
};

export default productApi;
