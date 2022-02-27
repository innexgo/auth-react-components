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
import React from 'react';
import { Card, Button, Form } from "react-bootstrap";
import { Formik } from 'formik';
import { emailNew } from '@innexgo/frontend-auth-api';
import { isErr } from '@innexgo/frontend-common';
import { SimpleLayout } from '@innexgo/common-react-components';
function CreateEmail(props) {
    const onSubmit = (_, fprops) => __awaiter(this, void 0, void 0, function* () {
        let errors = {};
        // Validate input
        let hasError = false;
        fprops.setErrors(errors);
        if (hasError) {
            return;
        }
        const maybeEmail = yield emailNew({
            verificationChallengeKey: props.verificationChallengeKey,
            toParent: false
        });
        if (isErr(maybeEmail)) {
            switch (maybeEmail.Err) {
                case "VERIFICATION_CHALLENGE_NONEXISTENT": {
                    fprops.setStatus({
                        failureResult: "This link is invalid.",
                        successResult: ""
                    });
                    break;
                }
                case "VERIFICATION_CHALLENGE_USED": {
                    fprops.setStatus({
                        failureResult: "This link has already been used.",
                        successResult: ""
                    });
                    break;
                }
                case "VERIFICATION_CHALLENGE_WRONG_KIND": {
                    fprops.setStatus({
                        failureResult: "This link is the wrong kind.",
                        successResult: ""
                    });
                    break;
                }
                case "VERIFICATION_CHALLENGE_TIMED_OUT": {
                    fprops.setStatus({
                        failureResult: "This link has timed out.",
                        successResult: ""
                    });
                    break;
                }
                case "EMAIL_EXISTENT": {
                    fprops.setStatus({
                        failureResult: "This user already exists.",
                        successResult: ""
                    });
                    break;
                }
                default: {
                    fprops.setStatus({
                        failureResult: "An unknown or network error has occured while trying to register.",
                        successResult: ""
                    });
                    break;
                }
            }
            return;
        }
        fprops.setStatus({
            failureResult: "",
            successResult: "Email Created"
        });
        // execute callback
        props.postSubmit(maybeEmail.Ok);
    });
    return _jsx(_Fragment, { children: _jsx(Formik, Object.assign({ onSubmit: onSubmit, initialValues: {
                name: "",
            }, initialStatus: {
                failureResult: "",
                successResult: ""
            } }, { children: (fprops) => _jsx(_Fragment, { children: _jsxs(Form, Object.assign({ noValidate: true, onSubmit: fprops.handleSubmit }, { children: [_jsxs("div", Object.assign({ hidden: fprops.status.successResult !== "" }, { children: [_jsx(Button, Object.assign({ type: "submit" }, { children: "Complete Registration" }), void 0), _jsx("br", {}, void 0), _jsx(Form.Text, Object.assign({ className: "text-danger" }, { children: fprops.status.failureResult }), void 0)] }), void 0), _jsx(Form.Text, Object.assign({ className: "text-success" }, { children: fprops.status.successResult }), void 0)] }), void 0) }, void 0) }), void 0) }, void 0);
}
function EmailConfirm(props) {
    var _a;
    const [email, setEmail] = React.useState(null);
    return (_jsx(SimpleLayout, Object.assign({ branding: props.branding }, { children: _jsx("div", Object.assign({ className: "h-100 w-100 d-flex" }, { children: _jsx(Card, Object.assign({ className: "mx-auto my-auto col-md-6" }, { children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Confirm Email" }, void 0), email !== null
                            ? _jsxs(Card.Text, { children: ["Your email (", email.verificationChallenge.email, "), has been confirmed. Click ", _jsx("a", Object.assign({ href: props.branding.dashboardUrl }, { children: "here" }), void 0), " to login."] }, void 0)
                            : _jsx(CreateEmail, { verificationChallengeKey: ((_a = new URLSearchParams(window.location.search).get("verificationChallengeKey")) !== null && _a !== void 0 ? _a : "")
                                    .replace(' ', '+'), postSubmit: e => {
                                    var _a;
                                    // if email is upgraded, then you need to re-log-in
                                    if (((_a = props.apiKey) === null || _a === void 0 ? void 0 : _a.apiKeyKind) === "NO_EMAIL") {
                                        props.setApiKey(null);
                                    }
                                    setEmail(e);
                                } }, void 0)] }, void 0) }), void 0) }), void 0) }), void 0));
}
export default EmailConfirm;
