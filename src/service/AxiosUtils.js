import axios from "axios";

export const client = axios.create({ baseURL: process.env.SERVER_BASE_URL });

export const serverClient = ({ ...options }) => {
    client.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    client.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

    // const onSuccess = (response) => response;
    // const onError = (error) => {
    //     //to add error handling
    //     console.log(error.response);
    //     if (error.response.status === 401) {
    //         localStorage.removeItem("token");
    //         localStorage.removeItem("userId");
    //     }
    //     throw error;
    // };

    // return client(options).then(onSuccess).catch(onError);
    return client(options);
};
