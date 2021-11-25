import React, { useState, useEffect } from 'react';
import constants from '../constants';
import config from '../config';
const { resourceServerOrigin } = config;

const AuthenticationContext = React.createContext({
  authenticated: false,
  toggleAuthenticated: () => {},
});

function AuthProvider({
  children,
}) {
  const [authenticated, setAuthentication] = useState(false);
  const toggleAuthenticated = (value) => {
    setAuthentication(value);
    if (!value) {
      localStorage.removeItem(constants.USER_PRPFILE);
      fetch(`${resourceServerOrigin}/user/signout`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        referrerPolicy: 'no-referrer',
        credentials: 'include',
      });
    }
    return false;
  };

  useEffect(() => {
    setAuthentication(document ? !!localStorage.getItem(constants.USER_PRPFILE) : false);
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        authenticated,
        toggleAuthenticated,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export {
  AuthProvider,
  AuthenticationContext,
};
