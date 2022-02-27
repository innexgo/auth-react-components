/// <reference types="react" />
import { ApiKey } from '@innexgo/frontend-auth-api';
import { Branding } from '@innexgo/common-react-components';
declare type EmailConfirmProps = {
    branding: Branding;
    apiKey: ApiKey | null;
    setApiKey: (a: ApiKey | null) => void;
};
declare function EmailConfirm(props: EmailConfirmProps): JSX.Element;
export default EmailConfirm;
