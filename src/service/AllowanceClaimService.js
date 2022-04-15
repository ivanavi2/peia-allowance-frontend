import { serverClient } from "./AxiosUtils";

const getAllAllowanceClaim = async () => {
    return serverClient({ url: "/allowanceClaim", method: "GET" });
};

const addAllowanceClaim = async ({ formData, attachments }) => {
    return serverClient({ url: "/allowanceClaim", method: "POST", data: { formData, attachments } });
};

const editAllowanceClaim = async ({ id, formData, attachments }) => {
    return serverClient({ url: `/allowanceClaim/${id}`, method: "PUT", data: { formData, attachments } });
};

export default { addAllowanceClaim, getAllAllowanceClaim, editAllowanceClaim };
