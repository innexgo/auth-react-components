var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Loader } from '@innexgo/common-react-components';
import { userDataView } from '@innexgo/frontend-auth-api';
import { unwrap } from '@innexgo/frontend-common';
import { Async } from 'react-async';
import { BoxArrowLeft as ExitAppIcon, List as MenuIcon } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
function getDefaultPreferences() {
    const defaultPreferences = {
        collapsed: true,
        dark: true,
    };
    return defaultPreferences;
}
function getPreexistingPreferences() {
    // what preferences default to on first login
    const preexistingPreferencesString = localStorage.getItem("preferences");
    const defaultPreferences = getDefaultPreferences();
    if (preexistingPreferencesString == null) {
        return defaultPreferences;
    }
    else {
        try {
            // TODO validate here
            return JSON.parse(preexistingPreferencesString);
        }
        catch (e) {
            // try to clean up a bad config
            localStorage.setItem("preferences", JSON.stringify(defaultPreferences));
            return defaultPreferences;
        }
    }
}
const InnerLayoutContext = React.createContext(getDefaultPreferences());
const iconStyle = {
    width: "2rem",
    height: "2rem",
};
const SidebarEntry = props => {
    const style = {
        color: "#fff"
    };
    const Icon = props.icon;
    if (React.useContext(InnerLayoutContext).collapsed) {
        // collapsed
        return _jsx("a", Object.assign({ style: style, className: "nav-item nav-link", href: props.href }, { children: _jsx(Icon, { style: iconStyle }) }));
    }
    else {
        // not collapsed
        return _jsxs("a", Object.assign({ style: style, className: "nav-item nav-link", href: props.href }, { children: [_jsx(Icon, { style: iconStyle, className: "me-2" }), props.label] }));
    }
};
const loadUserData = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield userDataView({
        creatorUserId: [props.apiKey.creatorUserId],
        onlyRecent: true,
        apiKey: props.apiKey.key,
    })
        .then(unwrap);
    return userData[0];
});
const Body = props => _jsxs(_Fragment, { children: [" ", props.children, " "] });
const InnerLayout = props => {
    const [preferences, setPreferencesState] = React.useState(getPreexistingPreferences());
    const setPreferences = (data) => {
        localStorage.setItem("preferences", JSON.stringify(data));
        setPreferencesState(data);
    };
    const widthrem = preferences.collapsed ? 4 : 15;
    const sidebarStyle = {
        height: "100%",
        width: `${widthrem}rem`,
        position: "fixed",
        top: 0,
        left: 0,
        overflowX: "hidden",
        overflowY: "hidden",
        margin: "0%"
    };
    const sidebarBottom = {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
    };
    let sidebarChildren = [];
    let nonSidebarChildren = [];
    React.Children.forEach(props.children, child => {
        if (React.isValidElement(child)) {
            if (child.type === SidebarEntry) {
                sidebarChildren.push(child);
            }
            else if (child.type === Body) {
                nonSidebarChildren.push(child);
            }
        }
    });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (_jsxs(InnerLayoutContext.Provider, Object.assign({ value: preferences }, { children: [_jsxs("nav", Object.assign({ className: "bg-dark text-light", style: sidebarStyle }, { children: [_jsx("div", Object.assign({ className: "nav-item nav-link link-light" }, { children: _jsx(MenuIcon, { style: iconStyle, onClick: _ => setPreferences({
                                collapsed: !preferences.collapsed,
                                dark: preferences.dark
                            }) }) })), _jsx("span", Object.assign({ className: "nav-item nav-link link-light mx-auto my-3" }, { children: _jsxs(Async, Object.assign({ promiseFn: loadUserData, apiKey: props.apiKey }, { children: [_jsx(Async.Pending, { children: preferences.collapsed ? false : _jsx(Loader, {}) }), _jsx(Async.Rejected, { children: _jsx("span", Object.assign({ className: "text-danger" }, { children: "Couldn't load User" })) }), _jsx(Async.Fulfilled, { children: ud => preferences.collapsed
                                        ? false
                                        : _jsxs("h6", { children: ["Welcome, ", ud.realname] }) })] })) })), sidebarChildren, _jsx("div", Object.assign({ style: sidebarBottom }, { children: _jsxs("button", Object.assign({ type: "button", className: "btn nav-item nav-link link-light", onClick: handleShow }, { children: [_jsx(ExitAppIcon, { style: iconStyle, className: "me-2" }), preferences.collapsed ? false : "Log Out"] })) })), _jsxs(Modal, Object.assign({ show: show, onHide: handleClose }, { children: [_jsx(Modal.Header, Object.assign({ closeButton: true }, { children: _jsx(Modal.Title, { children: "Log Out" }) })), _jsx(Modal.Body, { children: "Are you sure you want to log out?" }), _jsxs(Modal.Footer, { children: [_jsx(Button, Object.assign({ variant: "primary", onClick: () => props.logoutCallback() }, { children: "Yes" })), _jsx(Button, Object.assign({ variant: "secondary", onClick: handleClose }, { children: "No" }))] })] }))] })), _jsx("div", Object.assign({ style: { marginLeft: `${widthrem}rem` } }, { children: nonSidebarChildren }))] })));
};
InnerLayout.SidebarEntry = SidebarEntry;
InnerLayout.Body = Body;
export default InnerLayout;
