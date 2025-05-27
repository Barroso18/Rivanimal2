import axios from "axios";

const https = axios.create({
  baseURL: "https://backend.rivanimal-gestion.es",
  headers: {
    "Content-Type": "application/json",
  },
});

export default https;