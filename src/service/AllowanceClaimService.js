import { serverClient } from "./AxiosUtils";

const getAllAllowanceClaim = async () => {
    const response = await serverClient({ url: "/allowanceClaim", method: "GET" });
    const { data } = response;
    return data;
};

const addAllowanceClaim = async ({ formData, attachments }) => {
    return serverClient({ url: "/allowanceClaim", method: "POST", data: { formData, attachments } });
};

const editAllowanceClaim = async ({ id, formData, attachments }) => {
    return serverClient({ url: `/allowanceClaim/${id}`, method: "PUT", data: { formData, attachments } });
};

const approveAllowanceClaim = async (id) => {
    return serverClient({ url: `/allowanceClaim/${id}/approve`, method: "POST" });
};
const rejectAllowanceClaim = async (id) => {
    return serverClient({ url: `/allowanceClaim/${id}/reject`, method: "POST" });
};

const getAllowanceClaimByUser = async (userId) => {
    const response = await serverClient({ url: `/allowanceClaim/getAllowanceClaimByUser/${userId}`, method: "GET" });
    const { data } = response;
    return data;
};

export default { addAllowanceClaim, getAllAllowanceClaim, editAllowanceClaim, approveAllowanceClaim, rejectAllowanceClaim, getAllowanceClaimByUser };
