import authHelper from "../../helpers/auth.helper";
import http from "../../services/http.service";

const API_URL = process.env.REACT_APP_API_URL;

const productApi = {
  checkout: (productList) => {
    const URL = API_URL + "/products";
    const query = `?page=${page}&limit=${limit}&search=${search}`;
    return http.get(URL + query);
  },
};

export default productApi;
