import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import config from '../config';

const Container = styled.div`
  margin: 50px auto;
  border: 1px solid black;
  width: 500px;
  height: 500px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  a {
    color: black;
    text-decoration: none;
  }
`;

const GithubButton = styled.a`
  border: 1px solid gray;
  padding: 4px;
  cursor: pointer;
  bottom: 0;
  right: 0;
  cursor: pointer;
  font-size: 26px;
  width: 90%;
  text-align: center;
`;

const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';

function Login() {

  const randomString = uuidv4();
  const state = {
    service: 'github',
    randomString: randomString,
  }
  sessionStorage.setItem('randomString', randomString)
  const params = new URLSearchParams({
    client_id: config.githubClientId,
    redirect_uri: config.redirectUrl,
    scope: 'read:user user:email',
    state: JSON.stringify(state)
  });
  return (
    <Container>
        <GithubButton
          href={`${GITHUB_AUTH_URL}?${params}`}
        >
          Github Login
        </GithubButton>
    </Container>
  )
}

export default Login;
