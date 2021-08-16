import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import config from '../config';
import constants from '../constants';
import githubLogo from '../assets/github-logo.png';
import googleLogo from '../assets/google-logo.svg';

const Container = styled.div`
  text-align: center;
  margin: 50px 0;
  a {
    color: ${props => props.theme.buttonColor};
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
  }
`

const SignInContainer = styled.div`
  padding: 0 20px;
  border: 1px solid #333;
  display: inline-block;
  position: relative;
  color: black;
  margin-bottom: 10px;
  a {
    color: black;
    text-decoration: none;
  }
  border-radius: 5px;
`;

const Button = styled.div`
  margin: 20px 0;
  padding: 8px 18px;
  width: 200px;
  cursor: pointer;
  bottom: 0;
  right: 0;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  border-radius: 5px;
  display: flex;
  align-items: center;
  > img {
    height: 30px;
    width: 30px;
    margin-right: 16px;
  }
`;

const GithubButton = styled(Button)`
  color: white;
  background-color: #333;
`

const GoogleButton = styled(Button)`
  color: #8C8C8C;
  background-color: white;
  box-shadow: 0px 1px 2px #8C8C8C;
`

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
        <SignInContainer>
          <GithubButton
            onClick={() => {
              this.onClickHandler(constants.GITHUB)
            }}
          >
            <img src={githubLogo} alt="github logo" />
            <span>Sgin in with Github</span>
          </GithubButton>
          <GoogleButton
            onClick={() => {
              this.onClickHandler(constants.GOOGLE)
            }}
          >
            <img src={googleLogo} alt="google logo" />
            <span>Sign in with Google</span>
          </GoogleButton>
        </SignInContainer>
        <div>
          New to the service ? <Link to="/sign-up">Create an account</Link>
        </div>
      </Container>
    )
  }
}

export default Login;
