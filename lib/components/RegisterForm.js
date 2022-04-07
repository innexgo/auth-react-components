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
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { userNew } from '@innexgo/frontend-auth-api';
import { isErr } from '@innexgo/frontend-common';
import parse from 'date-fns/parse';
const DATEFORMAT = 'yyyy-MM-dd';
function RegisterForm(props) {
    const onSubmit = (values, fprops) => __awaiter(this, void 0, void 0, function* () {
        // Validate input
        let errors = {};
        let hasError = false;
        if (values.realname.length == 0) {
            errors.realname = "Invalid name";
            hasError = true;
        }
        if (values.username.length == 0 || values.username.length > 20) {
            errors.realname = "Invalid username";
            hasError = true;
        }
        if (values.password2 !== values.password1) {
            errors.password2 = "Password does not match";
            hasError = true;
        }
        if (!values.terms && props.tosUrl !== undefined) {
            errors.terms = "You must agree to the terms and conditions";
            hasError = true;
        }
        let dateofbirth = parse(values.dateofbirth, DATEFORMAT, new Date());
        if (isNaN(dateofbirth.valueOf())) {
            errors.dateofbirth = `Couldn't parse date, must be in format YYYY-MM-DD`;
            hasError = true;
        }
        fprops.setErrors(errors);
        if (hasError) {
            return;
        }
        const maybeApiKey = yield userNew({
            username: values.username,
            realname: values.realname,
            dateofbirth: dateofbirth.valueOf(),
            password: values.password1,
            // 1 hour
            apiKeyDuration: 60 * 60 * 1000
        });
        if (isErr(maybeApiKey)) {
            // otherwise display errors
            switch (maybeApiKey.Err) {
                case "USER_USERNAME_INVALID": {
                    fprops.setErrors({
                        username: "Invalid username"
                    });
                    break;
                }
                case "USER_USERNAME_TAKEN": {
                    fprops.setErrors({
                        username: "This username is already taken."
                    });
                    break;
                }
                case "USER_REALNAME_INVALID": {
                    fprops.setErrors({
                        realname: "Invalid name"
                    });
                    break;
                }
                case "USER_DATEOFBIRTH_INVALID": {
                    fprops.setErrors({
                        dateofbirth: "Invalid date of birth."
                    });
                    break;
                }
                case "PASSWORD_INSECURE": {
                    fprops.setErrors({
                        password1: "Password must have at least 8 chars and 1 number"
                    });
                    break;
                }
                default: {
                    fprops.setStatus("An unknown or network error has occured while trying to register.");
                    break;
                }
            }
            return;
        }
        // execute callback
        props.onSuccess(maybeApiKey.Ok);
    });
    const normalizeInput = (e) => e.replace(/[^a-z0-9]+/g, "");
    return (_jsx(Formik, Object.assign({ onSubmit: onSubmit, initialStatus: "", initialValues: {
            username: "",
            realname: "",
            dateofbirth: "",
            password1: "",
            password2: "",
            terms: false,
        } }, { children: (fprops) => _jsx(_Fragment, { children: _jsxs(Form, Object.assign({ noValidate: true, onSubmit: fprops.handleSubmit }, { children: [_jsxs(Form.Group, { children: [_jsx(Form.Label, { children: "Real Name" }), _jsx(Form.Control, { name: "realname", placeholder: "Real Name", value: fprops.values.realname, onChange: fprops.handleChange, isInvalid: !!fprops.errors.realname }), _jsx(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: fprops.errors.realname })), _jsx(Form.Text, Object.assign({ className: "text-muted" }, { children: "Please enter what you would like others to call you." }))] }), _jsxs(Form.Group, { children: [_jsx(Form.Label, { children: "Username" }), _jsx(Form.Control, { name: "username", placeholder: "username", value: fprops.values.username, onChange: e => fprops.setFieldValue("username", normalizeInput(e.target.value)), isInvalid: !!fprops.errors.username }), _jsx(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: fprops.errors.username })), _jsx(Form.Text, Object.assign({ className: "text-muted" }, { children: "Please enter a unique username." }))] }), _jsxs(Form.Group, { children: [_jsx(Form.Label, { children: "Date of Birth" }), _jsx(Form.Control, { name: "dateofbirth", placeholder: "YYYY-MM-DD", value: fprops.values.dateofbirth, onChange: fprops.handleChange, isInvalid: !!fprops.errors.dateofbirth }), _jsx(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: fprops.errors.dateofbirth })), _jsx(Form.Text, { className: "text-muted" })] }), _jsxs(Form.Group, Object.assign({ className: "mb-3" }, { children: [_jsx(Form.Label, { children: "Password" }), _jsx(Form.Control, { name: "password1", type: "password", placeholder: "Password", value: fprops.values.password1, onChange: fprops.handleChange, isInvalid: !!fprops.errors.password1 }), _jsx(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: fprops.errors.password1 }))] })), _jsxs(Form.Group, Object.assign({ className: "mb-3" }, { children: [_jsx(Form.Label, { children: "Confirm Password" }), _jsx(Form.Control, { name: "password2", type: "password", placeholder: "Confirm Password", value: fprops.values.password2, onChange: fprops.handleChange, isInvalid: !!fprops.errors.password2 }), _jsx(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: fprops.errors.password2 }))] })), _jsxs(Form.Check, Object.assign({ className: "mb-3 form-check", hidden: props.tosUrl === undefined }, { children: [_jsx(Form.Check.Input, { name: "terms", checked: fprops.values.terms, onChange: fprops.handleChange, isInvalid: !!fprops.errors.terms }), _jsxs(Form.Check.Label, { children: ["Agree to ", _jsx("a", Object.assign({ target: "_blank", rel: "noopener noreferrer", href: props.tosUrl }, { children: "terms of service" }))] }), _jsx(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: fprops.errors.terms }))] })), _jsx("br", {}), _jsx(Button, Object.assign({ type: "submit" }, { children: "Submit Form" })), _jsx(Form.Group, { children: _jsx(Form.Text, Object.assign({ className: "text-danger" }, { children: fprops.status })) })] })) }) })));
}
export default RegisterForm;
