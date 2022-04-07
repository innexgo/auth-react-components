import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Card, Button } from "react-bootstrap";
import LoginForm from '../components/LoginForm';
import DefaultSidebarLayout from '../components/DefaultSidebarLayout';
import SendVerificationChallengeForm from "../components/SendVerificationChallengeForm";
function AuthenticatedComponentRenderer({ branding, component: AuthenticatedComponent, apiKey, setApiKey, }) {
    // the email we sent to
    const [sentEmail, setSentEmail] = React.useState(null);
    const [sentParentEmail, setSentParentEmail] = React.useState(null);
    const isAuthenticated = apiKey !== null &&
        apiKey.creationTime + apiKey.duration > Date.now() &&
        apiKey.apiKeyKind === "VALID";
    if (isAuthenticated) {
        return _jsx(AuthenticatedComponent, { apiKey: apiKey, setApiKey: setApiKey, branding: branding });
    }
    const notLoggedIn = apiKey === null ||
        apiKey.creationTime + apiKey.duration <= Date.now() ||
        apiKey.apiKeyKind === "CANCEL";
    if (notLoggedIn) {
        return _jsx(DefaultSidebarLayout, Object.assign({ branding: branding }, { children: _jsx("div", Object.assign({ className: "h-100 w-100 d-flex" }, { children: _jsx(Card, Object.assign({ className: "mx-auto my-auto col-md-6" }, { children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Login" }), _jsx(LoginForm, { branding: branding, onSuccess: setApiKey })] }) })) })) }));
    }
    if (sentEmail !== null) {
        return _jsx(DefaultSidebarLayout, Object.assign({ branding: branding }, { children: _jsx("div", Object.assign({ className: "h-100 w-100 d-flex" }, { children: _jsx(Card, Object.assign({ className: "mx-auto my-auto col-md-6" }, { children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Verfication Email Sent!" }), _jsxs(Card.Text, { children: ["We successfully sent an email to ", sentEmail, ". You should use the link provided in the email to finish setting up your account. If you don't see our email, reload this page and try again."] })] }) })) })) }));
    }
    if (sentParentEmail !== null) {
        return _jsx(DefaultSidebarLayout, Object.assign({ branding: branding }, { children: _jsx("div", Object.assign({ className: "h-100 w-100 d-flex" }, { children: _jsx(Card, Object.assign({ className: "mx-auto my-auto col-md-6" }, { children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Parent Verfication Email Sent!" }), _jsxs(Card.Text, { children: ["We successfully sent an email to ", sentParentEmail, "."] }), _jsx(Card.Text, { children: "If your parents don't see our email, reload this page and try again. Once your parent approves your account, you should be able to log in normally." }), _jsx(Button, Object.assign({ onClick: () => setApiKey(null) }, { children: "Log In" }))] }) })) })) }));
    }
    if (apiKey.apiKeyKind === "NO_EMAIL") {
        return _jsx(DefaultSidebarLayout, Object.assign({ branding: branding }, { children: _jsx("div", Object.assign({ className: "h-100 w-100 d-flex" }, { children: _jsx(Card, Object.assign({ className: "mx-auto my-auto col-md-6" }, { children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Verify Your Email" }), _jsx(SendVerificationChallengeForm, { toParent: false, initialEmailAddress: "", setVerificationChallenge: x => setSentEmail(x.email), apiKey: apiKey })] }) })) })) }));
    }
    else {
        return _jsx(DefaultSidebarLayout, Object.assign({ branding: branding }, { children: _jsx("div", Object.assign({ className: "h-100 w-100 d-flex" }, { children: _jsx(Card, Object.assign({ className: "mx-auto my-auto col-md-6" }, { children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Verify Parent Email" }), _jsx(Card.Text, { children: "Because you indicated you are under 13, we need parent permission to finish setting up your account." }), _jsx(SendVerificationChallengeForm, { toParent: true, initialEmailAddress: "", setVerificationChallenge: x => setSentParentEmail(x.email), apiKey: apiKey })] }) })) })) }));
    }
}
export default AuthenticatedComponentRenderer;
