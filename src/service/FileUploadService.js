import { serverClient } from "./AxiosUtils";
import axios from "axios";

const getSignature = () => {
    return serverClient({ url: "/fileUpload/getSignature", method: "GET" });
};

const uploadToCloudinary = (formData) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`;
    return axios.post(url, formData);
};

export default {
    getSignature,
    uploadToCloudinary,
};
