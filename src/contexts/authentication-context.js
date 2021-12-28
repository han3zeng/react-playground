import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import config from '../config';
import { _ } from '../utils';
import constants from '../constants';

const { USER_PRPFILE } = constants;
const { resourceServerOrigin } = config;
const { deleteCookie } = _;

const AuthenticationContext = React.createContext({
  isLoading: true,
  authenticated: false,
  toggleAuthenticated: () => {},
});

function AuthProvider({
  children,
}) {
  const [authenticated, setAuthentication] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const toggleAuthenticated = async (value) => {
    setAuthentication(value);
    if (!value) {
      deleteCookie({
        name: 'signIn',
      });
      localStorage.removeItem(USER_PRPFILE);
      await fetch(`${resourceServerOrigin}/user/sign-out`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        referrerPolicy: 'no-referrer',
        credentials: 'include',
      });
      router.push('/');
    }
  };

  useEffect(() => {
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      setIsLoading(false);
      setAuthentication(true);
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        authenticated,
        toggleAuthenticated,
        isLoading,
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
