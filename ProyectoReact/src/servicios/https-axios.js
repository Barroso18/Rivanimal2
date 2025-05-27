import axios from "axios";

const https = axios.create({
  baseURL: "http://backend.rivanimal-gestion.es",
  headers: {
    "Content-Type": "application/json",
  },
});

export default https;