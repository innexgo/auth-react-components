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
import DefaultSidebarLayout from '../components/DefaultSidebarLayout';
function CreateEmail(props) {
    const onSubmit = (values, fprops) => __awaiter(this, void 0, void 0, function* () {
        let errors = {};
        // Validate input
        let hasError = false;
        if (!values.terms && props.tosUrl !== undefined) {
            errors.terms = "You must agree to the terms and conditions";
            hasError = true;
        }
        fprops.setErrors(errors);
        if (hasError) {
            return;
        }
        const maybeEmail = yield emailNew({
            verificationChallengeKey: props.verificationChallengeKey,
            toParent: true,
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
                //name: "",
                terms: false,
            }, initialStatus: {
                failureResult: "",
                successResult: ""
            } }, { children: (fprops) => _jsx(_Fragment, { children: _jsxs(Form, Object.assign({ noValidate: true, onSubmit: fprops.handleSubmit }, { children: [_jsxs("div", Object.assign({ hidden: fprops.status.successResult !== "" }, { children: [_jsxs(Form.Check, Object.assign({ className: "mb-3 form-check", hidden: props.tosUrl === undefined }, { children: [_jsx(Form.Check.Input, { name: "terms", checked: fprops.values.terms, onChange: fprops.handleChange, isInvalid: !!fprops.errors.terms }), _jsxs(Form.Check.Label, { children: ["Agree to ", _jsx("a", Object.assign({ target: "_blank", rel: "noopener noreferrer", href: props.tosUrl }, { children: "terms of service" }))] }), _jsx(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: fprops.errors.terms }))] })), _jsx(Button, Object.assign({ type: "submit" }, { children: "I give permission for my child to use this service." })), _jsx("br", {}), _jsx(Form.Text, Object.assign({ className: "text-danger" }, { children: fprops.status.failureResult }))] })), _jsx(Form.Text, Object.assign({ className: "text-success" }, { children: fprops.status.successResult }))] })) }) })) });
}
function ParentPermissionConfirm(props) {
    var _a;
    const [email, setEmail] = React.useState(null);
    return (_jsx(DefaultSidebarLayout, Object.assign({ branding: props.branding }, { children: _jsx("div", Object.assign({ className: "h-100 w-100 d-flex" }, { children: _jsx(Card, Object.assign({ className: "mx-auto my-auto col-md-6" }, { children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Parent Permission" }), email !== null
                            ? _jsx(Card.Text, { children: "Thank you, your response has been noted." })
                            : _jsx(CreateEmail, { tosUrl: props.branding.tosUrl, verificationChallengeKey: ((_a = new URLSearchParams(window.location.search).get("verificationChallengeKey")) !== null && _a !== void 0 ? _a : "")
                                    .replace(' ', '+'), postSubmit: e => setEmail(e) })] }) })) })) })));
}
export default ParentPermissionConfirm;
