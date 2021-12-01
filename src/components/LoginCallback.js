import React, {
  useEffect,
  useContext,
  memo,
  useState,
} from 'react';
import styled, { keyframes } from 'styled-components';
import { useRouter } from 'next/router';
import config from '../config';
import { AuthenticationContext } from '../contexts';
import constants, { PATH } from '../constants';
import refreshIcon from '../assets/refresh-icon.svg';
import { form } from '../utils';
import Loading from './Loading';

const { signIn } = form;
const {
  authServerOrigin,
  githubClientId,
  origin,
  redirectPath,
  googleCleintId,
} = config;

const redirectUrl = `${origin}/${redirectPath}`;

const {
  GITHUB,
  GOOGLE,
  ACCOUNT,
  REDIRECT_CSRF_KEY,
} = constants;
const stages = {
  loading: 'loading',
  error: 'error',
};

const rotate = keyframes`
  fromm {
    transofrm: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 100px;
`;

function LoginCallback() {
  const router = useRouter();
  const { isReady, query } = router;
  const authentication = useContext(AuthenticationContext);
  const [stage, setStage] = useState('loading');
  useEffect(() => {
    let stateObject = {};
    if (!isReady) {
      return;
    }
    const { code, state } = query;
    try {
      stateObject = JSON.parse(decodeURIComponent(state))
    } catch (e) {

    }
    const { csrfKey, service } = stateObject;
    if (sessionStorage.getItem(REDIRECT_CSRF_KEY) && (csrfKey !== sessionStorage.getItem(REDIRECT_CSRF_KEY))) {
      router.push(`${PATH.signIn}/?errorType=inconsistentState`);
      return;
    }
    const params = (() => {
      if (service === GITHUB) {
        return {
          authorizeURL: `${authServerOrigin}/token/github`,
          clientID: githubClientId,
        };
      } else if (service === GOOGLE) {
        return {
          authorizeURL: `${authServerOrigin}/token/google`,
          clientID: googleCleintId,
        }
      } else if (service === ACCOUNT) {
        return {
          authorizeURL: `${authServerOrigin}/token/account`,
          clientID: null,
        }
      }
    })()

    const options = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        code: decodeURIComponent(code),
        clientID: params.clientID,
        redirectUri: redirectUrl
      }),
    }
    fetch(params.authorizeURL, options)
      .then((response) => {
        response.json()
          .then((data) => {
            const { accessToken, ok } = data;
            if (ok) {
              signIn({
                accessToken,
              })
                .then(() => {
                  authentication.toggleAuthenticated(true);
                  router.push(`/${PATH.profile}`);
                })
                .catch((e) => {
                  console.log('e: ', e);
                });
            } else {
              setStage(stages.error);
            }
          });
      })
      .catch(() => {
        console.log('error')
      })
  }, [isReady]);
  const content = () => {
    if (stage === stages.loading) {
      return (
        <Loading />
      );
    } else if (stage === stages.error)
      return (
        <p>Invalid auth code</p>
      )
  }
  return (
    <Container>
      {content()}
    </Container>
  )
}

export default memo(LoginCallback);
