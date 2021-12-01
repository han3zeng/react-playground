import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../src/hooks/useAuth';
import SignIn from '../src/components/SignIn';
import { PATH } from '../src/constants';

function SignInPage() {
  const { authenticated } = useAuth;
  const router = useRouter();
  useEffect(() => {
    if (authenticated) {
      router.push(`/${PATH.profile}`);
    }
  }, [authenticated, router]);
  return <SignIn />;
}

export default SignInPage;
