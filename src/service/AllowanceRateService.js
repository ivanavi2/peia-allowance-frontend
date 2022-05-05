import { serverClient } from "./AxiosUtils";

const getAllowanceRateByAllowanceType = async (allowanceType) => {
    const response = await serverClient({ url: "/allowanceRate/getAllowanceRateByAllowanceType", method: "GET", params: { allowanceType } });
    const { data } = response;
    return data;
};

const editAllowanceRateByCode = async ({ allowanceType, code, rate }) => {
    return serverClient({ url: `/allowanceRate/editAllowanceRateByCode`, method: "PUT", data: { allowanceType, code, rate } });
};

export default { getAllowanceRateByAllowanceType, editAllowanceRateByCode };
