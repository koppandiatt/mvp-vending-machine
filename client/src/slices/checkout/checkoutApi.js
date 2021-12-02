import authHelper from "../../helpers/auth.helper";
import http from "../../services/http.service";

const API_URL = process.env.REACT_APP_API_URL;

const checkoutApi = {
  checkout: (productList, totalCost) => {
    const URL = API_URL + "/buy";
    return http.post(
      URL,
      {
        products: productList.map((p) => {
          return { productId: p._id, amount: p.qty };
        }),
        totalCost: totalCost,
      },
      authHelper.axiosConfig()
    );
  },
};

export default checkoutApi;
