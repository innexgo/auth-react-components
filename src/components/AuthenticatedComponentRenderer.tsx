import React from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { ApiKey, Email } from "@innexgo/frontend-auth-api";
import AuthenticatedComponentProps from '../components/AuthenticatedComponentProps';
import { Branding } from '@innexgo/common-react-components';
import { useSearchParams } from "react-router-dom";
import { Async } from "react-async";
import WaitingPage from "@innexgo/common-react-components/lib/components/SimplePage";

export interface AuthenticatedComponentRendererProps {
  branding: Branding,
  component: React.ComponentType<AuthenticatedComponentProps>
  apiKey: ApiKey | null,
  setApiKey: (data: ApiKey | null) => void,
  authServerUrlFn: () => Promise<string>,
}

interface NotAuthenticatedHandlerProps {
  setApiKey: (data: ApiKey | null) => void,
  authServerUrl: string,
}

class NotAuthenticatedHandler extends React.Component<NotAuthenticatedHandlerProps> {
  private alreadyMoved: boolean;
  constructor(props: NotAuthenticatedHandlerProps) {
    super(props);
    this.alreadyMoved = false;
  }

  componentDidMount(): void {
    if (!this.alreadyMoved) {
      const searchParams = new URLSearchParams(window.location.search);
      // if not authenticated then we need to check if we have a query string containing the api key.
      const apiKeyJson = searchParams.get('apiKey');
      if (apiKeyJson === null) {
        // if null we need to redirect to the auth site to login
        let url = new URL('/login', this.props.authServerUrl);
        url.searchParams.append('src', window.location.href);
        window.location.replace(url);
      } else {
        // if not null then we set api key and restore parameters
        this.props.setApiKey(JSON.parse(apiKeyJson));
        window.history.replaceState(null, '', searchParams.get("src")!);
      }
      this.alreadyMoved = true;
    }
  }

  render() {
    return null;
  }
}

function AuthenticatedComponentRenderer(props: AuthenticatedComponentRendererProps) {
  const isAuthenticated = props.apiKey !== null &&
    props.apiKey.creationTime + props.apiKey.duration > Date.now() &&
    props.apiKey.apiKeyKind === "VALID";

  if (isAuthenticated) {
    return <props.component apiKey={props.apiKey!} setApiKey={props.setApiKey} branding={props.branding} />
  } else {
    return <Async promiseFn={props.authServerUrlFn}>
      <Async.Pending>
        <WaitingPage>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </WaitingPage>
      </Async.Pending>
      <Async.Rejected>{error =>
        <WaitingPage>
          <h1>Error Contacting Server: <span className="text-danger">{error.message}</span></h1>
        </WaitingPage>
      }</Async.Rejected>
      <Async.Fulfilled<string>>{data =>
        <NotAuthenticatedHandler setApiKey={props.setApiKey} authServerUrl={data} />
      }</Async.Fulfilled>
    </Async>
  }
}

export default AuthenticatedComponentRenderer;
