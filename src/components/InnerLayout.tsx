import React, { useState } from 'react';
import { ApiKey, UserData, userDataView } from '@innexgo/frontend-auth-api';
import { unwrap } from '@innexgo/frontend-common';
import { Async, AsyncProps } from 'react-async';
import { Icon, BoxArrowLeft as ExitAppIcon, List as MenuIcon } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button';

export interface Preferences {
  collapsed: boolean,
  dark: boolean,
}

function getDefaultPreferences() {
  const defaultPreferences: Preferences = {
    collapsed: true,
    dark: true,
  }
  return defaultPreferences;
}

function getPreexistingPreferences() {
  // what preferences default to on first login

  const preexistingPreferencesString = localStorage.getItem("preferences");
  const defaultPreferences = getDefaultPreferences();

  if (preexistingPreferencesString == null) {
    return defaultPreferences;
  } else {
    try {
      // TODO validate here
      return JSON.parse(preexistingPreferencesString) as Preferences;
    } catch (e) {
      // try to clean up a bad config
      localStorage.setItem("preferences", JSON.stringify(defaultPreferences));
      return defaultPreferences;
    }
  }
}

const InnerLayoutContext = React.createContext<Preferences>(getDefaultPreferences());


const iconStyle = {
  width: "2rem",
  height: "2rem",
};


interface SidebarEntryProps {
  label: string,
  icon: Icon,
  href: string,
}

const SidebarEntry: React.FunctionComponent<SidebarEntryProps> = props => {
  const style = {
    color: "#fff"
  }
  const Icon = props.icon;
  if (React.useContext(InnerLayoutContext).collapsed) {
    // collapsed
    return <a style={style} className="nav-item nav-link" href={props.href}>
      <Icon style={iconStyle} />
    </a>
  } else {
    // not collapsed
    return <a style={style} className="nav-item nav-link" href={props.href}>
      <Icon style={iconStyle} className="me-2" />{props.label}
    </a>
  }
}

const loadUserData = async (props: AsyncProps<UserData>) => {
  const userData = await userDataView({
    creatorUserId: [props.apiKey.creatorUserId],
    onlyRecent: true,
    apiKey: props.apiKey.key,
  })
    .then(unwrap);

  return userData[0];
}



const Body: React.FunctionComponent<{ children: React.ReactNode }> = props => <> {props.children} </>

interface InnerLayoutComposition {
  SidebarEntry: React.FunctionComponent<SidebarEntryProps>
  Body: React.FunctionComponent<{ children: React.ReactNode }>
}

interface InnerLayoutProps {
  apiKey: ApiKey
  logoutCallback: () => void
}

const InnerLayout: React.FunctionComponent<React.PropsWithChildren<InnerLayoutProps>> & InnerLayoutComposition =
  props => {
    const [preferences, setPreferencesState] = React.useState(getPreexistingPreferences());
    const setPreferences = (data: Preferences) => {
      localStorage.setItem("preferences", JSON.stringify(data));
      setPreferencesState(data);
    };

    const widthrem = preferences.collapsed ? 4 : 15;

    const sidebarStyle = {
      height: "100vh",
      width: `${widthrem}rem`,
      position: "fixed" as const,
      top: 0,
      left: 0,
      overflowX: "hidden" as const,
      overflowY: "hidden" as const,
      margin: "0%"
    };

    let sidebarChildren: React.ReactElement[] = [];
    let nonSidebarChildren: React.ReactNode[] = [];


    React.Children.forEach(props.children, child => {
      if (React.isValidElement(child)) {
        if (child.type === SidebarEntry) {
          sidebarChildren.push(child);
        } else if (child.type === Body) {
          nonSidebarChildren.push(child);
        }
      }
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <InnerLayoutContext.Provider value={preferences}>
        <nav className="bg-dark text-light ps-3 pt-3 d-flex flex-column" style={sidebarStyle}>
          <div className="nav-item nav-link link-light">
            <MenuIcon style={iconStyle}
              onClick={_ => setPreferences({
                collapsed: !preferences.collapsed,
                dark: preferences.dark
              })}
            />
          </div>
          <div className="nav-item nav-link link-light my-3">
            <Async promiseFn={loadUserData} apiKey={props.apiKey}>
              <Async.Pending>
                {preferences.collapsed
                  ? false
                  : <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                }
              </Async.Pending>
              <Async.Rejected>
                <span className="text-danger">Couldn't load User</span>
              </Async.Rejected>
              <Async.Fulfilled<UserData>>{ud =>
                preferences.collapsed
                  ? false
                  : <h6>Welcome, {ud.realname}</h6>
              }
              </Async.Fulfilled>
            </Async>
          </div>
          {sidebarChildren}
          <button
            type="button"
            className="btn nav-item nav-link link-light mt-auto"
            onClick={handleShow}
          >
            <ExitAppIcon style={iconStyle} className="me-2" />
            {preferences.collapsed ? false : "Log Out"}
          </button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Log Out</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to log out?</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => props.logoutCallback()}>
                Yes
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                No
              </Button>
            </Modal.Footer>
          </Modal>
        </nav>
        <div style={{ marginLeft: `${widthrem}rem` }}>
          {nonSidebarChildren}
        </div>
      </InnerLayoutContext.Provider>
    )
  }

InnerLayout.SidebarEntry = SidebarEntry;
InnerLayout.Body = Body;

export default InnerLayout;
