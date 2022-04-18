import React from "react";

import useAuth from "../CustomHooks/useAuth";

const UnlockAccess = ({ children, roles }) => {
    const { user } = useAuth();

    const hasPermission = (roles) => {
        return roles && !roles.includes(user.userGroup);
    };

    return <>{hasPermission() && children}</>;
};

export default UnlockAccess;
