import React, { useRef } from "react";
import classNames from "classnames";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";

import useAuth from "./CustomHooks/useAuth";

export const AppTopbar = (props) => {
    const profileButtonOverlayRef = useRef(null);
    const { signOut } = useAuth();
    const onSignOutClicked = () => {
        signOut();
    };
    return (
        <div className="layout-topbar">
            <button type="button" className="p-link  layout-menu-button layout-topbar-button ml-1" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars" />
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <ul className={classNames("layout-topbar-menu lg:flex origin-top", { "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive })}>
                <li>
                    <button
                        className="p-link layout-topbar-button"
                        onClick={(e) => {
                            profileButtonOverlayRef.current.toggle(e);
                        }}
                    >
                        <i className="pi pi-user" />
                        <span>Profile</span>
                    </button>
                </li>
            </ul>
            <OverlayPanel ref={profileButtonOverlayRef}>
                <div>
                    <Button label="Sign out" className="p-button-text p-button-secondary" onClick={onSignOutClicked} />
                </div>
            </OverlayPanel>
        </div>
    );
};
