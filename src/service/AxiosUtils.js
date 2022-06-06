import axios from "axios";

export const client = axios.create({ baseURL: process.env.REACT_APP_SERVER_BASE_URL });

export const serverClient = ({ ...options }) => {
    client.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    client.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

    return client(options);
};
