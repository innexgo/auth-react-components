var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Formik } from 'formik';
import { Button, Card, Form, } from 'react-bootstrap';
import { passwordResetNew } from '@innexgo/frontend-auth-api';
import { isErr } from '@innexgo/frontend-common';
import { SimpleLayout } from '@innexgo/common-react-components';
function ForgotPasswordForm(props) {
    const onSubmit = (values, { setErrors, setStatus }) => __awaiter(this, void 0, void 0, function* () {
        // Validate input
        if (values.email === "") {
            setErrors({ email: "Please enter your email" });
            return;
        }
        // Now send request
        const maybePasswordResetKey = yield passwordResetNew({
            userEmail: values.email
        });
        if (isErr(maybePasswordResetKey)) {
            switch (maybePasswordResetKey.Err) {
                case "USER_NONEXISTENT": {
                    setErrors({ email: "No such user exists." });
                    break;
                }
                case "EMAIL_BOUNCED": {
                    setErrors({ email: "This email address is invalid." });
                    break;
                }
                case "EMAIL_COOLDOWN": {
                    setStatus("Please wait 15 minutes before trying to send more emails.");
                    break;
                }
                default: {
                    setStatus("An unknown or network error has occured while trying to reset the password.");
                    break;
                }
            }
            return;
        }
        props.onSuccess();
    });
    return (_jsx(Formik, Object.assign({ onSubmit: onSubmit, initialValues: {
            email: "",
        }, initialStatus: "" }, { children: (props) => (_jsxs(Form, Object.assign({ noValidate: true, onSubmit: props.handleSubmit }, { children: [_jsxs(Form.Group, Object.assign({ className: "mb-3" }, { children: [_jsx(Form.Label, { children: "Email" }, void 0), _jsx(Form.Control, { name: "email", type: "email", placeholder: "Email", value: props.values.email, onChange: props.handleChange, isInvalid: !!props.errors.email }, void 0), _jsxs(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: [" ", props.errors.email, " "] }), void 0)] }), void 0), _jsx(Form.Group, Object.assign({ className: "mb-3" }, { children: _jsx(Button, Object.assign({ type: "submit" }, { children: "Submit" }), void 0) }), void 0), _jsx(Form.Group, Object.assign({ className: "mb-3" }, { children: _jsx(Form.Text, Object.assign({ className: "text-danger" }, { children: props.status }), void 0) }), void 0)] }), void 0)) }), void 0));
}
function ForgotPassword(props) {
    const [successful, setSuccess] = React.useState(false);
    return _jsx(SimpleLayout, Object.assign({ branding: props.branding }, { children: _jsx("div", Object.assign({ className: "h-100 w-100 d-flex" }, { children: _jsx(Card, Object.assign({ className: "mx-auto my-auto col-md-6" }, { children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Send Reset Password Email" }, void 0), successful
                            ? _jsx(Form.Text, Object.assign({ className: "text-success" }, { children: "We've sent an email to reset your password." }), void 0)
                            : _jsx(ForgotPasswordForm, { onSuccess: () => setSuccess(true) }, void 0)] }, void 0) }), void 0) }), void 0) }), void 0);
}
export default ForgotPassword;
