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
import { isErr } from '@innexgo/frontend-common';
import { userDataNew, } from '@innexgo/frontend-auth-api';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
const DATEFORMAT = 'yyyy-MM-dd';
function EditUserDataForm(props) {
    const onSubmit = (values, { setStatus, setErrors }) => __awaiter(this, void 0, void 0, function* () {
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
        let dateofbirth = parse(values.dateofbirth, DATEFORMAT, new Date());
        if (isNaN(dateofbirth.valueOf())) {
            errors.dateofbirth = `Couldn't parse date, must be in format YYYY-MM-DD`;
            hasError = true;
        }
        setErrors(errors);
        if (hasError) {
            return;
        }
        const maybeUserData = yield userDataNew({
            username: values.username,
            realname: values.realname,
            dateofbirth: dateofbirth.valueOf(),
            apiKey: props.apiKey.key,
        });
        if (isErr(maybeUserData)) {
            switch (maybeUserData.Err) {
                case "API_KEY_UNAUTHORIZED": {
                    setStatus({
                        failureMessage: "Please log back in and try again",
                        successMessage: ""
                    });
                    break;
                }
                case "USER_USERNAME_INVALID": {
                    setErrors({
                        username: "Invalid username"
                    });
                    break;
                }
                case "USER_USERNAME_TAKEN": {
                    setErrors({
                        username: "This username is already taken."
                    });
                    break;
                }
                case "USER_REALNAME_INVALID": {
                    setErrors({
                        realname: "Invalid name"
                    });
                    break;
                }
                case "USER_DATEOFBIRTH_INVALID": {
                    setErrors({
                        dateofbirth: "Invalid date of birth."
                    });
                    break;
                }
                default: {
                    setStatus({
                        failureMessage: "An unknown or network error has occured while trying to change name.",
                        successMessage: ""
                    });
                    break;
                }
            }
        }
        else {
            setStatus({
                failureMessage: "",
                successMessage: "Successfully updated information."
            });
            props.setUserData(maybeUserData.Ok);
        }
    });
    return _jsx(_Fragment, { children: _jsx(Formik, Object.assign({ onSubmit: onSubmit, initialStatus: {
                successMessage: "",
                failureMessage: "",
            }, initialValues: {
                realname: props.userData.realname,
                username: props.userData.username,
                dateofbirth: format(props.userData.dateofbirth, DATEFORMAT),
            } }, { children: (props) => (_jsxs(Form, Object.assign({ noValidate: true, onSubmit: props.handleSubmit }, { children: [_jsxs(Form.Group, { children: [_jsx(Form.Label, { children: "Real Name" }), _jsx(Form.Control, { name: "realname", placeholder: "Real Name", value: props.values.realname, onChange: props.handleChange, isInvalid: !!props.errors.realname }), _jsx(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: props.errors.realname })), _jsx(Form.Text, Object.assign({ className: "text-muted" }, { children: "Please enter what you would like others to call you." }))] }), _jsxs(Form.Group, { children: [_jsx(Form.Label, { children: "Username" }), _jsx(Form.Control, { name: "username", placeholder: "username", value: props.values.username, onChange: props.handleChange, isInvalid: !!props.errors.username }), _jsx(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: props.errors.username })), _jsx(Form.Text, Object.assign({ className: "text-muted" }, { children: "Please enter a unique username." }))] }), _jsxs(Form.Group, { children: [_jsx(Form.Label, { children: "Date of Birth" }), _jsx(Form.Control, { name: "dateofbirth", placeholder: "YYYY-MM-DD", value: props.values.dateofbirth, onChange: props.handleChange, isInvalid: !!props.errors.dateofbirth }), _jsx(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: props.errors.dateofbirth })), _jsx(Form.Text, { className: "text-muted" })] }), _jsx("br", {}), _jsx(Button, Object.assign({ type: "submit" }, { children: "Update" })), _jsx("br", {}), _jsx(Form.Text, Object.assign({ className: "text-danger" }, { children: props.status.failureMessage })), _jsx(Form.Text, Object.assign({ className: "text-success" }, { children: props.status.successMessage }))] }))) })) });
}
export default EditUserDataForm;
