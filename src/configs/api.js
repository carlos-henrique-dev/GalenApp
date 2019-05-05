import axios from "axios";

const api = axios.create({
    baseURL: "https://backend-gallen.herokuapp.com/"
    //baseURL: "http://192.168.1.107:3006"
});

export default api;
