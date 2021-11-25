import { useContext } from 'react';
import { AuthenticationContext } from '../contexts';

function useAuth() {
  const authCtx = useContext(AuthenticationContext);

  return {
    ...authCtx,
  };
}

export default useAuth;
