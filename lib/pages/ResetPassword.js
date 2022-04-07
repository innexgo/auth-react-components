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
import { Formik } from 'formik';
import { Card, Button, Form, } from 'react-bootstrap';
import { passwordNewReset, } from '@innexgo/frontend-auth-api';
import { isErr } from '@innexgo/frontend-common';
import DefaultSidebarLayout from '../components/DefaultSidebarLayout';
function ResetPasswordForm(props) {
    const onSubmit = (values, { setStatus, setErrors }) => __awaiter(this, void 0, void 0, function* () {
        // Validate input
        let errors = {};
        let hasError = false;
        if (values.password2 !== values.password1) {
            errors.password2 = "Password does not match.";
            hasError = true;
        }
        setErrors(errors);
        if (hasError) {
            return;
        }
        const passwordResetResult = yield passwordNewReset({
            passwordResetKey: props.resetKey,
            newPassword: values.password1,
        });
        if (isErr(passwordResetResult)) {
            switch (passwordResetResult.Err) {
                case "PASSWORD_RESET_NONEXISTENT": {
                    setStatus({
                        failureMessage: "Invalid password reset link.",
                        successMessage: ""
                    });
                    break;
                }
                case "PASSWORD_RESET_TIMED_OUT": {
                    setStatus({
                        failureMessage: "Password reset link timed out.",
                        successMessage: ""
                    });
                    break;
                }
                case "PASSWORD_EXISTENT": {
                    setStatus({
                        failureMessage: "Password reset link may only be used once.",
                        successMessage: ""
                    });
                    break;
                }
                case "PASSWORD_INSECURE": {
                    setErrors({
                        password1: "Password must have at least 8 chars and 1 number"
                    });
                    break;
                }
                default: {
                    setStatus({
                        failureMessage: "An unknown or network error has occured while trying to reset password.",
                        successMessage: ""
                    });
                    break;
                }
            }
        }
        else {
            setStatus({
                failureMessage: "",
                successMessage: "Password successfully changed."
            });
            props.onSuccess();
        }
    });
    return _jsx(_Fragment, { children: _jsx(Formik, Object.assign({ onSubmit: onSubmit, initialStatus: {
                successMessage: "",
                failureMessage: "",
            }, initialValues: {
                password1: "",
                password2: "",
            } }, { children: (props) => (_jsxs(Form, Object.assign({ noValidate: true, onSubmit: props.handleSubmit }, { children: [_jsxs(Form.Group, Object.assign({ className: "mb-3" }, { children: [_jsx(Form.Label, { children: "New Password" }), _jsx(Form.Control, { name: "password1", type: "password", placeholder: "New Password", value: props.values.password1, onChange: props.handleChange, isInvalid: !!props.errors.password1 }), _jsxs(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: [" ", props.errors.password1, " "] }))] })), _jsxs(Form.Group, Object.assign({ className: "mb-3" }, { children: [_jsx(Form.Label, { children: "Confirm Password" }), _jsx(Form.Control, { name: "password2", type: "password", placeholder: "Confirm Password", value: props.values.password2, onChange: props.handleChange, isInvalid: !!props.errors.password2 }), _jsx(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: props.errors.password2 }))] })), _jsx(Form.Group, Object.assign({ className: "mb-3" }, { children: _jsx(Button, Object.assign({ type: "submit" }, { children: "Reset Password" })) })), _jsxs(Form.Group, Object.assign({ className: "mb-3" }, { children: [_jsx(Form.Text, Object.assign({ className: "text-danger" }, { children: props.status.failureMessage })), _jsx(Form.Text, Object.assign({ className: "text-success" }, { children: props.status.successMessage }))] }))] }))) })) });
}
function ResetPassword(props) {
    var _a;
    // get password reset key from url
    const resetKey = ((_a = new URLSearchParams(window.location.search).get("resetKey")) !== null && _a !== void 0 ? _a : "").replace(' ', '+');
    const [successful, setSuccess] = React.useState(false);
    return _jsx(DefaultSidebarLayout, Object.assign({ branding: props.branding }, { children: _jsx("div", Object.assign({ className: "h-100 w-100 d-flex" }, { children: _jsx(Card, Object.assign({ className: "mx-auto my-auto col-md-6" }, { children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Reset Password" }), successful
                            ? _jsx(Card.Text, Object.assign({ className: "text-success" }, { children: "Password changed successfully" }))
                            : _jsx(ResetPasswordForm, { resetKey: resetKey, onSuccess: () => setSuccess(true) })] }) })) })) }));
}
export default ResetPassword;
