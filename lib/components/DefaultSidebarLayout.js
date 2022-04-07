import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ArrowRight, House, PersonPlus, Gear, FileText } from 'react-bootstrap-icons';
import { Container, Row, Col } from 'react-bootstrap';
const gradText = {
    background: "linear-gradient(#B7C9D6, #E6D5B8)",
    color: "transparent",
    backgroundClip: "text",
    fontWeight: "bold",
    marginBottom: "50px"
};
const iconStyle = {
    color: "#E6D5B8",
    minHeight: "2rem",
    minWidth: "2rem",
    marginRight: "10px",
    marginLeft: "-20px"
};
const linkStyle = {
    color: "white",
    fontWeight: 550,
    display: "flex",
    marginTop: "15px",
    alignItems: "center"
};
const DefaultSidebarLayout = (props) => _jsx(Container, Object.assign({ fluid: true }, { children: _jsxs(Row, Object.assign({ style: { minHeight: "100vh" } }, { children: [_jsxs(Col, Object.assign({ xl: "2", className: "px-5 py-5", style: { backgroundColor: '#1C2B2D' } }, { children: [_jsx("a", Object.assign({ href: props.branding.homeUrl }, { children: _jsx("img", { src: props.branding.darkAdaptedIcon, alt: `${props.branding.name} Icon` }) })), _jsx("h4", Object.assign({ style: gradText }, { children: props.branding.name })), _jsxs("a", Object.assign({ href: props.branding.homeUrl, style: linkStyle }, { children: [_jsx(House, { style: iconStyle }), " Home"] })), _jsx("br", {}), _jsxs("a", Object.assign({ href: props.branding.dashboardUrl, style: linkStyle }, { children: [_jsx(ArrowRight, { style: iconStyle }), " Log In"] })), _jsx("br", {}), _jsxs("a", Object.assign({ href: props.branding.registerUrl, style: linkStyle }, { children: [_jsx(PersonPlus, { style: iconStyle }), " Register"] })), _jsx("br", {}), props.branding.instructionUrl === undefined ?
                        null
                        : _jsxs(_Fragment, { children: [_jsxs("a", Object.assign({ href: props.branding.instructionUrl, style: linkStyle }, { children: [_jsx(FileText, { style: iconStyle }), " Instructions"] })), _jsx("br", {})] }), props.branding.tosUrl === undefined ?
                        null
                        : _jsxs(_Fragment, { children: [_jsxs("a", Object.assign({ href: props.branding.tosUrl, style: linkStyle }, { children: [_jsx(Gear, { style: iconStyle }), " Terms of Service"] })), _jsx("br", {})] })] })), _jsx(Col, Object.assign({ className: "px-5 py-5" }, { children: props.children }))] })) }));
export default DefaultSidebarLayout;
