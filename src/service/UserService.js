import { serverClient } from "./AxiosUtils";

const getUserById = async (id) => {
    const response = await serverClient({ url: `/user/${id}`, method: "GET" });
    const { data } = response;
    return data;
};

export default {
    getUserById,
};
