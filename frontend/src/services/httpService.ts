import Modal from "antd/lib/modal";
import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-type": "application/json",
  },
});

// Request interceptor
http.interceptors.request.use(
  (config: any) => {
    
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      !!error.response &&
      !!error.response.data.error &&
      !!error.response.data.error.message &&
      error.response.data.error.details
    ) {
      Modal.error({
        title: error.response.data.error.message,
        content: error.response.data.error.details,
      });
    } else if (
      !!error.response &&
      !!error.response.data.error &&
      !!error.response.data.error.message
    ) {
      Modal.error({
        title: "An error occurred",
        content: error.response.data.error.message,
      });
    } else if (!error.response) {
      Modal.error({ content: "Unknown Error" });
    }

    setTimeout(() => {}, 1000);

    return Promise.reject(error);
  }
);

export default http;