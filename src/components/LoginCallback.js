import React, { useEffect, useContext, memo, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import config from '../config';
import { AuthenticationContext } from '../contexts';
import constants from '../constants';
import refreshIcon from '../assets/refresh-icon.svg';
import styled, { keyframes } from 'styled-components';
const {
  authServerOrigin,
  resourceServerOrigin,
  githubClientId,
  redirectUrl,
  googleCleintId
} = config;
const {
  GITHUB,
  GOOGLE,
  ACCOUNT,
  CSRF_KEY,
  USER_PRPFILE
} = constants;
const stages = {
  loading: 'loading',
  error: 'error'
}


const rotate = keyframes`
  fromm {
    transofrm: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 100px;
`

const Loading = styled.div`
  animation: ${rotate} 2s linear infinite;
`;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function LoginCallback() {
  const query = useQuery();
  const history = useHistory();
  const authentication = useContext(AuthenticationContext);
  const [stage, setStage] = useState('loading');
  useEffect(() => {
    let stateObject = {}
    const code = query.get('code')
    try {
      stateObject = JSON.parse(decodeURIComponent(query.get('state')))
    } catch (e) {

    }
    const { csrfKey, service } = stateObject;
    if (sessionStorage.getItem(CSRF_KEY) && (csrfKey !== sessionStorage.getItem(CSRF_KEY))) {
      history.push("/login?errorType=inconsistentState");
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

    const Login = ({ accessToken }) => {
      fetch(`${resourceServerOrigin}/user/login`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        referrerPolicy: 'no-referrer',
        credentials: 'include'
      })
        .then((response) => {
          response.json()
            .then((userProfile) => {
              const { name, email, avatarURL } = userProfile
              localStorage.setItem(USER_PRPFILE, JSON.stringify({ name, email, avatarURL }));
              authentication.toggleAuthenticated(true);
              sessionStorage.removeItem(CSRF_KEY)
              history.push('/dashboard');
            })
        })
        .catch(() => {
          console.log('error')
        })
    }

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
              Login({
                accessToken
              })
            } else {
              setStage(stages.error)
            }
          })
      })
      .catch(() => {
        console.log('error')
      })
  }, [])
  const content = () => {
    if (stage === stages.loading) {
      return (
        <Loading>
          <img src={refreshIcon} />
        </Loading>
      )
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
