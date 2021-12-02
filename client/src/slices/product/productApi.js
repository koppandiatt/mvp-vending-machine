import _ from "lodash";
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
  create: (product) => {
    const URL = API_URL + "/products";
    return http.post(URL, product, authHelper.axiosConfig());
  },
  update: (product) => {
    const URL = API_URL + `/products/${product._id}`;
    return http.put(
      URL,
      _.pick(product, ["productName", "cost", "amountAvailable"]),
      authHelper.axiosConfig()
    );
  },
  delete: (id) => {
    const URL = API_URL + `/products/${id}`;
    return http.delete(URL, authHelper.axiosConfig());
  },
};

export default productApi;
