import axios from "axios";

const https = axios.create({
  baseURL: "http://localhost/Rivanimal2/FuncionesPHP",
  headers: {
    "Content-Type": "application/json",
  },
});

export default https;