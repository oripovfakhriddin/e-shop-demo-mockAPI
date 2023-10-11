import axios from "axios";

const request = axios.create({
  baseURL: "https://6525c47a67cfb1e59ce7aa7a.mockapi.io/ofa/api/v1/",
  timeout: 10000,
})

export default request;