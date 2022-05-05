import { serverClient } from "./AxiosUtils";

const getTeacherByUser = async (userId) => {
    const response = await serverClient({ url: `/teacher/getTeacherByUser/${userId}`, method: "GET" });
    const { data } = response;
    return data;
};

export default {
    getTeacherByUser,
};
