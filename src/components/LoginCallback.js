import React, { useEffect, useContext, memo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import config from '../config';
import { AuthenticationContext } from '../contexts';
import constants from '../constants';
import refreshIcon from '../assets/refresh-icon.svg';
import styled, { keyframes } from 'styled-components';
const { authServerOrigin, resourceServerOrigin, githubClientId, redirectUrl } = config;


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
  useEffect(() => {
    let stateObject = {}
    const code = query.get('code')
    try {
      stateObject = JSON.parse(decodeURIComponent(query.get('state')))
    } catch (e) {

    }
    const { csrfKey, service } = stateObject;
    if (csrfKey !== sessionStorage.getItem(constants.CSRF_KEY)) {
      history.push("/login?errorType=inconsistentState");
      return;
    }
    if (service === 'github') {
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
          code,
          clientID: githubClientId,
          redirectUri: redirectUrl
        }),
      }
      fetch(`${authServerOrigin}/auth/github`, options)
        .then((response) => {
          response.json()
            .then((data) => {
              const { accessToken } = data;
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
                      localStorage.setItem(constants.USER_PRPFILE, JSON.stringify(userProfile));
                      authentication.toggleAuthenticated(true);
                      sessionStorage.removeItem(constants.CSRF_KEY)
                      history.push('/dashboard');
                    })
                })
                .catch(() => {
                  console.log('error')
                })
            })
        })
        .catch(() => {
          console.log('error')
        })
    }
  }, [])
  return (
    <Container>
      <Loading>
        <img src={refreshIcon} />
      </Loading>
    </Container>
  )
}

export default memo(LoginCallback);
