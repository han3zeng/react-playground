import React from 'react';

const AuthenticationContext = React.createContext({
  authenticated: false,
  toggleAuthenticated: () => {}
});

export default AuthenticationContext;
