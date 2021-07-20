import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import config from '../config';
const { authServerOrigin, githubClientId, redirectUrl } = config;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function LoginCallback() {
  const query = useQuery();
  useEffect(() => {
    let stateObject = {}
    const code = query.get('code')
    try {
      stateObject = JSON.parse(query.get('state'))
    } catch (e) {

    }
    const { randomString, service } = stateObject;
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
      fetch(`${authServerOrigin}/login/oauth/github/access_token`, options)
        .then(() => {
          console.log('result')
        })
        .catch(() => {
          console.log('error')
        })
    }
  })
  return (
    <div>this is processing</div>
  )
}

export default LoginCallback;
