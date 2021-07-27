import React, { Component } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import config from '../config';
import constants from '../constants';


const Container = styled.div`
  margin: 50px auto;
  border: 1px solid black;
  width: 300px;
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
  border-radius: 3px;
`;

const GithubButton = styled.a`
  border: 1px solid gray;
  padding: 4px;
  cursor: pointer;
  bottom: 0;
  right: 0;
  cursor: pointer;
  font-size: 26px;
  width: 85%;
  text-align: center;
  border-radius: 3px;
`;

const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    }
    this.csrfKey = null;
    this.onClickHandler = this._onClickHandler.bind(this);
  }

  _onClickHandler() {
    if (!window) return;
    const state = {
      service: 'github',
      csrfKey: this.csrfKey,
    }
    const params = new URLSearchParams({
      client_id: config.githubClientId,
      redirect_uri: config.redirectUrl,
      scope: 'read:user user:email',
      state: encodeURIComponent(JSON.stringify(state))
    });
    sessionStorage.setItem(constants.CSRF_KEY, this.csrfKey)
    window.location.href = `${GITHUB_AUTH_URL}?${params}`
  }

  componentDidMount() {
    this.csrfKey = uuidv4();
  }

  render () {

    return (
      <Container>
        <GithubButton
          onClick={this.onClickHandler}
        >
          Github Sign in
        </GithubButton>
      </Container>
    )
  }
}

export default Login;
