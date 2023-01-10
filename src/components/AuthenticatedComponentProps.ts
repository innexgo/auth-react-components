import { ApiKey } from '@innexgo/frontend-auth-api';
import { Branding } from '@innexgo/common-react-components';

export default interface AuthenticatedComponentProps {
  // other branding stuff
  branding: Branding,
  // url to the auth-server domain
  authServerUrl: string,
  // api key
  apiKey: ApiKey,
  // function to set the api key
  setApiKey: (data: ApiKey | null) => void,
}
