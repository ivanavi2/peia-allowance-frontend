import { serverClient } from "./AxiosUtils";

const login = async ({ login, password }) => {
    return serverClient({ url: "/login", method: "POST", data: { login, password } });
};

export default {
    login,
};
