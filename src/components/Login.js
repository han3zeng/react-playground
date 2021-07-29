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

const Button = styled.a`
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
const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    }
    this.csrfKey = null;
    this.onClickHandler = this._onClickHandler.bind(this);
  }

  _onClickHandler(serviceProvider) {
    if (!window) return;
    const state = {
      service: serviceProvider,
      csrfKey: this.csrfKey,
    }

    const clientId = (() => {
      switch (serviceProvider) {
        case constants.GITHUB:
          return config.githubClientId;
        case constants.GOOGLE:
          return config.googleCleintId;
        default:
          return undefined;
      }
    })()

    const scope = (() => {
      switch (serviceProvider) {
        case constants.GITHUB:
          return 'read:user user:email';
        case constants.GOOGLE:
          return 'profile email openid';
        default:
          return undefined;
      }
    })()

    const baseURL = (() => {
      switch (serviceProvider) {
        case constants.GITHUB:
          return GITHUB_AUTH_URL;
        case constants.GOOGLE:
          return GOOGLE_AUTH_URL;
        default:
          return undefined;
      }
    })()

    const params = (() => {
      const base = {
        response_type: 'code',
        client_id: clientId,
        redirect_uri: config.redirectUrl,
        scope: scope,
        state: encodeURIComponent(JSON.stringify(state))
      }
      const result = (() => {
        if (serviceProvider === constants.GITHUB) {
          return base;
        }
        if (serviceProvider === constants.GOOGLE) {
          return {
            ...base,
            access_type: 'offline'
          }
        }
      })();
      return new URLSearchParams(result);
    })();
    sessionStorage.setItem(constants.CSRF_KEY, this.csrfKey)
    window.location.href = `${baseURL}?${params}`
  }

  componentDidMount() {
    this.csrfKey = uuidv4();
  }

  render () {
    return (
      <Container>
        <Button
          onClick={() => {
            this.onClickHandler(constants.GITHUB)
          }}
        >
          Sgin in with Github
        </Button>
        <Button
          onClick={() => {
            this.onClickHandler(constants.GOOGLE)
          }}
        >
          Sign in with Google
        </Button>
      </Container>
    )
  }
}

export default Login;
