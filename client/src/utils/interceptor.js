import axios from "axios";
import { baseURL } from "./config";

axios.defaults.baseURL = baseURL + "/api";

axios.interceptors.request.use(
  async (req) => {
    req.headers = {
      "Content-Type": req.multipartForm
        ? "multipart/form-data"
        : "application/json",
    };
    delete req.multipartForm;
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);
