import http from "../../services/http.service";

const API_URL = process.env.REACT_APP_API_URL + "/products";

const productApi = {
  getProducts: (page = 1, limit = 20, search = "") => {
    const query = `?page=${page}&limit=${limit}&search=${search}`;
    return http.get(API_URL + query);
  },
};

export default productApi;
