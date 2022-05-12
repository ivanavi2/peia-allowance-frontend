import { useEffect, useRef } from "react";

import { client } from "../service/AxiosUtils";
import useAuth from "../CustomHooks/useAuth";

const ResponseInterceptor = () => {
    const { redirectLogin } = useAuth();
    const interceptorId = useRef(null);
    useEffect(() => {
        interceptorId.current = client.interceptors.response.use(
            function (response) {
                // Do something with response data
                return response;
            },
            function (error) {
                // Do something with response error
                if (error.response) {
                    if (error.response.status === 401 || error.response.status === 403) {
                        redirectLogin();
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            client.interceptors.response.eject(interceptorId.current);
        };
    }, [redirectLogin]);

    return null;
};

export default ResponseInterceptor;
