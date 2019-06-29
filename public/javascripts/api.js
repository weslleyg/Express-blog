const axios = require("axios");

const api = axios.create({
  baseURL: "http://localhost:3333"
});

api.interceptors.request.use(async config => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

module.exports.api = api;
