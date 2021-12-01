import { toast } from "react-toastify";
import axios from "axios";

// We will intercept any error globally
axios.interceptors.response.use(null, (req) => {
  const response = req.response;
  const expectedError =
    response && response.status >= 400 && response.status < 500;

  if (expectedError) {
    toast.error(response.data.error);
  } else {
    toast.error("Something went wrong! Please contact server administrator!");
    console.log(`An unexpected error occurrred: ${error}`);
  }

  return Promise.reject(req);
});

function setJwt(jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  CancelToken: axios.CancelToken,
  setJwt,
};

export default http;
