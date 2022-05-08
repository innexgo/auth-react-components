import React from 'react';
import { ApiKey } from '@innexgo/frontend-auth-api';
import { Icon } from 'react-bootstrap-icons';
export interface Preferences {
    collapsed: boolean;
    dark: boolean;
}
interface SidebarEntryProps {
    label: string;
    icon: Icon;
    href: string;
}
interface InnerLayoutComposition {
    SidebarEntry: React.FunctionComponent<SidebarEntryProps>;
    Body: React.FunctionComponent<{
        children: React.ReactNode;
    }>;
}
interface InnerLayoutProps {
    apiKey: ApiKey;
    logoutCallback: () => void;
}
declare const InnerLayout: React.FunctionComponent<React.PropsWithChildren<InnerLayoutProps>> & InnerLayoutComposition;
export default InnerLayout;
