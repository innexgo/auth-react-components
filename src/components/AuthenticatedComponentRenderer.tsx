import React from "react";
import { Card, Button } from "react-bootstrap";
import { ApiKey, Email } from "@innexgo/frontend-auth-api";
import AuthenticatedComponentProps from '../components/AuthenticatedComponentProps';
import { Branding } from '@innexgo/common-react-components';
import { useSearchParams } from "react-router-dom";

export interface AuthenticatedComponentRendererProps {
  branding: Branding,
  authServerUrl: string,
  component: React.ComponentType<AuthenticatedComponentProps>
  apiKey: ApiKey | null,
  setApiKey: (data: ApiKey | null) => void
}

function AuthenticatedComponentRenderer({ branding, component: AuthenticatedComponent, apiKey, authServerUrl, setApiKey, }: AuthenticatedComponentRendererProps) {
  const isAuthenticated = apiKey !== null &&
    apiKey.creationTime + apiKey.duration > Date.now() &&
    apiKey.apiKeyKind === "VALID";

  React.useEffect(() => {
    if (!isAuthenticated) {
      const searchParams = new URLSearchParams(window.location.search);
      // if not authenticated then we need to check if we have a query string containing the api key.
      const apiKeyJson = searchParams.get('apiKey');

      if (apiKeyJson === null) {
        // if null we need to redirect to the auth site to login
        let url = new URL('/login', authServerUrl);
        url.searchParams.append('src', window.location.href);
        window.location.replace(url);
      } else {
        // if not null then we set api key and restore parameters
        setApiKey(JSON.parse(apiKeyJson));
        window.location.replace(searchParams.get("src")!);
      }
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return <AuthenticatedComponent apiKey={apiKey!} setApiKey={setApiKey} authServerUrl={authServerUrl} branding={branding} />
  } else {
    return null;
  }
}

export default AuthenticatedComponentRenderer;
