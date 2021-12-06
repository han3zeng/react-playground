import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import config from '../config';
import { _ } from '../utils';

const { resourceServerOrigin } = config;
const { getCookies } = _;

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
    const cookies = getCookies();
    if (cookies && cookies['user-profile'] !== undefined) {
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
