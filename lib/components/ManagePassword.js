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
import { Formik } from 'formik';
import { Button, Form, } from 'react-bootstrap';
import { passwordNewChange } from '@innexgo/frontend-auth-api';
import { isErr } from '@innexgo/frontend-common';
function ManagePassword(props) {
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
        const passwordChangeResult = yield passwordNewChange({
            oldPassword: values.oldpassword,
            newPassword: values.password1,
            apiKey: props.apiKey.key,
        });
        if (isErr(passwordChangeResult)) {
            switch (passwordChangeResult.Err) {
                case "API_KEY_UNAUTHORIZED": {
                    setStatus("Please log back in and try again");
                    break;
                }
                case "PASSWORD_INSECURE": {
                    setErrors({
                        password1: "Password must have at least 8 chars and 1 number"
                    });
                    break;
                }
                default: {
                    setStatus("An unknown or network error has occured while trying to reset password.");
                    break;
                }
            }
        }
        else {
            props.onSuccess(passwordChangeResult.Ok);
        }
    });
    return _jsx(_Fragment, { children: _jsx(Formik, Object.assign({ onSubmit: onSubmit, initialStatus: "", initialValues: {
                oldpassword: "",
                password1: "",
                password2: "",
            } }, { children: (props) => (_jsxs(Form, Object.assign({ noValidate: true, onSubmit: props.handleSubmit }, { children: [_jsxs(Form.Group, Object.assign({ className: "mb-3" }, { children: [_jsx(Form.Label, { children: "Old Password" }), _jsx(Form.Control, { name: "oldpassword", type: "password", placeholder: "Old Password", value: props.values.oldpassword, onChange: props.handleChange, isInvalid: !!props.errors.password1 }), _jsxs(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: [" ", props.errors.oldpassword, " "] }))] })), _jsxs(Form.Group, Object.assign({ className: "mb-3" }, { children: [_jsx(Form.Label, { children: "New Password" }), _jsx(Form.Control, { name: "password1", type: "password", placeholder: "New Password", value: props.values.password1, onChange: props.handleChange, isInvalid: !!props.errors.password1 }), _jsxs(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: [" ", props.errors.password1, " "] }))] })), _jsxs(Form.Group, Object.assign({ className: "mb-3" }, { children: [_jsx(Form.Label, { children: "Confirm Password" }), _jsx(Form.Control, { name: "password2", type: "password", placeholder: "Confirm Password", value: props.values.password2, onChange: props.handleChange, isInvalid: !!props.errors.password2 }), _jsx(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: props.errors.password2 }))] })), _jsx(Form.Group, Object.assign({ className: "mb-3" }, { children: _jsx(Button, Object.assign({ type: "submit" }, { children: "Change Password" })) })), _jsx(Form.Group, Object.assign({ className: "mb-3" }, { children: _jsx(Form.Text, Object.assign({ className: "text-danger" }, { children: props.status })) }))] }))) })) });
}
export default ManagePassword;
