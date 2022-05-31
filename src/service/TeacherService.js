import { serverClient } from "./AxiosUtils";

const getAllTeacher = async () => {
    const response = await serverClient({ url: "/teacher/", method: "GET" });
    const { data } = response;
    return data;
};

const getTeacherByUser = async (userId) => {
    const response = await serverClient({ url: `/teacher/getTeacherByUser/${userId}`, method: "GET" });
    const { data } = response;
    return data;
};

export default {
    getAllTeacher,
    getTeacherByUser,
};
