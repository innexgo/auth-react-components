import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from 'react-bootstrap';
import RegisterForm from '../components/RegisterForm';
import { SimpleLayout } from '@innexgo/common-react-components';
import { useNavigate } from 'react-router-dom';
// this function returns true if your account is incomplete
// if you're fully logged in, you can still view the register
// after you fill out the register though, you'll be automatically logged out
const createdInitialAccount = (apiKey) => apiKey !== null &&
    apiKey.creationTime + apiKey.duration > Date.now()
    && (apiKey.apiKeyKind === "NO_EMAIL" || apiKey.apiKeyKind === "NO_PARENT");
function Register(props) {
    const navigate = useNavigate();
    return (_jsx(SimpleLayout, Object.assign({ branding: props.branding }, { children: _jsx("div", Object.assign({ className: "h-100 w-100 d-flex" }, { children: _jsx(Card, Object.assign({ className: "mx-auto my-auto col-md-6" }, { children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Register" }, void 0), createdInitialAccount(props.apiKey)
                            // if authenticated go to home
                            ? navigate(props.branding.dashboardUrl)
                            // if not authenticated yet, then display this
                            : _jsx(RegisterForm, { onSuccess: apiKey => props.setApiKey(apiKey), tosUrl: props.branding.tosUrl }, void 0)] }, void 0) }), void 0) }), void 0) }), void 0));
}
export default Register;
