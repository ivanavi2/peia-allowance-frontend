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

/** Admin dashboard API services */
const getPendingAllowanceClaimCount = async () => {
    const response = await serverClient({ url: `/allowanceClaim/getPendingAllowanceClaimCount`, method: "GET" });
    const { data } = response;
    return data;
};

const getApprovedAllowanceClaimCountSinceLast30Days = async () => {
    const response = await serverClient({ url: `/allowanceClaim/getApprovedAllowanceClaimCountSinceLast30Days`, method: "GET" });
    const { data } = response;
    return data;
};

const getRejectedAllowanceClaimCountSinceLast30Days = async () => {
    const response = await serverClient({ url: `/allowanceClaim/getRejectedAllowanceClaimCountSinceLast30Days`, method: "GET" });
    const { data } = response;
    return data;
};

const getApprovedAllowanceClaimAmountSinceLast30Days = async () => {
    const response = await serverClient({ url: `/allowanceClaim/getApprovedAllowanceClaimAmountSinceLast30Days`, method: "GET" });
    const { data } = response;
    return data;
};

const getApprovedAllowanceClaimAmountCurrentYearByMonth = async () => {
    const response = await serverClient({ url: `/allowanceClaim/getApprovedAllowanceClaimAmountCurrentYearByMonth`, method: "GET" });
    const { data } = response;
    return data;
};

const getApprovedAllowanceClaimAmountCurrentYearByType = async () => {
    const response = await serverClient({ url: `/allowanceClaim/getApprovedAllowanceClaimAmountCurrentYearByType`, method: "GET" });
    const { data } = response;
    return data;
};

/** Invigilator dashboard API services */
const getInvigilatorPendingAllowanceClaimCount = async (invigilatorId) => {
    const response = await serverClient({ url: `/allowanceClaim/getPendingAllowanceClaimCount/${invigilatorId}`, method: "GET" });
    const { data } = response;
    return data;
};

const getInvigilatorApprovedAllowanceClaimCountSinceLast30Days = async (invigilatorId) => {
    const response = await serverClient({ url: `/allowanceClaim/getApprovedAllowanceClaimCountSinceLast30Days/${invigilatorId}`, method: "GET" });
    const { data } = response;
    return data;
};

const getInvigilatorRejectedAllowanceClaimCountSinceLast30Days = async (invigilatorId) => {
    const response = await serverClient({ url: `/allowanceClaim/getRejectedAllowanceClaimCountSinceLast30Days/${invigilatorId}`, method: "GET" });
    const { data } = response;
    return data;
};

const getInvigilatorApprovedAllowanceClaimAmountSinceLast30Days = async (invigilatorId) => {
    const response = await serverClient({ url: `/allowanceClaim/getApprovedAllowanceClaimAmountSinceLast30Days/${invigilatorId}`, method: "GET" });
    const { data } = response;
    return data;
};

const getInvigilatorApprovedAllowanceClaimAmountCurrentYearByMonth = async (invigilatorId) => {
    const response = await serverClient({ url: `/allowanceClaim/getApprovedAllowanceClaimAmountCurrentYearByMonth/${invigilatorId}`, method: "GET" });
    const { data } = response;
    return data;
};

const getInvigilatorApprovedAllowanceClaimAmountCurrentYearByType = async (invigilatorId) => {
    const response = await serverClient({ url: `/allowanceClaim/getApprovedAllowanceClaimAmountCurrentYearByType/${invigilatorId}`, method: "GET" });
    const { data } = response;
    return data;
};

export default {
    addAllowanceClaim,
    getAllAllowanceClaim,
    editAllowanceClaim,
    approveAllowanceClaim,
    rejectAllowanceClaim,
    getAllowanceClaimByUser,
    getPendingAllowanceClaimCount,
    getApprovedAllowanceClaimCountSinceLast30Days,
    getRejectedAllowanceClaimCountSinceLast30Days,
    getApprovedAllowanceClaimAmountSinceLast30Days,
    getApprovedAllowanceClaimAmountCurrentYearByMonth,
    getApprovedAllowanceClaimAmountCurrentYearByType,
    getInvigilatorPendingAllowanceClaimCount,
    getInvigilatorApprovedAllowanceClaimCountSinceLast30Days,
    getInvigilatorRejectedAllowanceClaimCountSinceLast30Days,
    getInvigilatorApprovedAllowanceClaimAmountSinceLast30Days,
    getInvigilatorApprovedAllowanceClaimAmountCurrentYearByMonth,
    getInvigilatorApprovedAllowanceClaimAmountCurrentYearByType,
};
