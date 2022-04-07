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
import { verificationChallengeNew } from '@innexgo/frontend-auth-api';
import { isErr } from '@innexgo/frontend-common';
function SendVerificationChallengeForm(props) {
    const onSubmit = (values, { setStatus, setErrors }) => __awaiter(this, void 0, void 0, function* () {
        // Validate input
        let errors = {};
        let hasError = false;
        if (!values.email.includes('@')) {
            errors.email = "Invalid email address";
            hasError = true;
        }
        setErrors(errors);
        if (hasError) {
            return;
        }
        const passwordChangeResult = yield verificationChallengeNew({
            email: values.email,
            toParent: props.toParent,
            apiKey: props.apiKey.key,
        });
        if (isErr(passwordChangeResult)) {
            switch (passwordChangeResult.Err) {
                case "API_KEY_UNAUTHORIZED": {
                    setStatus("Please log back in and try again");
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
                    setStatus("An unknown or network error has occured while trying to send the email.");
                    break;
                }
            }
        }
        else {
            props.setVerificationChallenge(passwordChangeResult.Ok);
        }
    });
    return _jsx(_Fragment, { children: _jsx(Formik, Object.assign({ onSubmit: onSubmit, initialStatus: "", initialValues: {
                email: props.initialEmailAddress,
            } }, { children: (props) => (_jsxs(Form, Object.assign({ noValidate: true, onSubmit: props.handleSubmit }, { children: [_jsxs(Form.Group, Object.assign({ className: "mb-3" }, { children: [_jsx(Form.Label, { children: "Email Address" }), _jsx(Form.Control, { name: "email", type: "email", placeholder: "Email", value: props.values.email, onChange: props.handleChange, isInvalid: !!props.errors.email }), _jsx(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: props.errors.email }))] })), _jsx(Form.Group, Object.assign({ className: "mb-3" }, { children: _jsx(Button, Object.assign({ type: "submit" }, { children: "Send Verification Email" })) })), _jsx(Form.Group, Object.assign({ className: "mb-3" }, { children: _jsx(Form.Text, Object.assign({ className: "text-danger" }, { children: props.status })) }))] }))) })) });
}
export default SendVerificationChallengeForm;
