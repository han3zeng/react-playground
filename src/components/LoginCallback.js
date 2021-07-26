import React, { useEffect, useContext, memo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import config from '../config';
import { AuthenticationContext } from '../contexts';
import constants from '../constants';
const { authServerOrigin, resourceServerOrigin, githubClientId, redirectUrl } = config;


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
                      localStorage.setItem('userProfile', JSON.stringify(userProfile));
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
    <div>this is processing</div>
  )
}

export default memo(LoginCallback);
