import axios from "axios";

const https = axios.create({
  baseURL: "http://rivanimal-gestion.es/Rivanimal2/FuncionesPHP",
  headers: {
    "Content-Type": "application/json",
  },
});

export default https;