import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:3001" });

export const serverClient = ({ ...options }) => {
    /*  client.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
        'adminToken'
      )}` */
    client.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

    const onSuccess = (response) => response;
    const onError = (error) => {
        //to add error handling
        throw error;
    };

    return client(options).then(onSuccess).catch(onError);
};
