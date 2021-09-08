import React from "react";
import Home from "./components/Home";
import LoginCallback from "./components/LoginCallback";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import Navigation from "./components/Navigation";
import Layout from "./components/Layout";
import SignUp from './components/SignUp';
import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Helmet } from "react-helmet";
import { breakpoints } from "./config";
import { AuthenticationContext } from './contexts';
import constants from './constants';
import config from './config';
const { resourceServerOrigin } = config;


const theme = {
  buttonColor: "#326891",
  sectionMargin: "68px",
  pageMargin: "20px;",
  headerColor: "#121212",
  contentColor: "#333333",
  captionColor: "#666666",
  fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji'
};

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--color-bg-canvas);
    color: var(--color-text-primary);
    font-family: ${props => props.theme.fontFamily};
    font-size: 14px;
    line-height: 1.5;
    margin: 0;
    padding: 0;
  }

  p {
    font-size: 16px;
    line-height: 130%;
    color: ${props => props.theme.contentColor};
  }

  h1 {
    color: ${props => props.theme.headerColor};
    font-size: 48px;
    line-height: 130%;
    @media(max-width: ${breakpoints.maxTablet}px) {
      font-size: 36px;
    }
  }

  h2 {
    color: ${props => props.theme.headerColor};
    font-size: 44px;
    line-height: 130%;
    @media(max-width: ${breakpoints.maxTablet}px) {
      font-size: 30px;
    }
    margin: 1em 0 1em 0;
  }

  h3 {
    color: ${props => props.theme.headerColor};
    font-size: 28px;
    line-height: 130%;
    @media(max-width: ${breakpoints.maxTablet}px) {
      font-size: 24px;
    }
  }

  a {
    text-decoration: none;
    color: black;
  }

  input, textarea, button {font-family: inherit}

  button {
    border: none;
    text-decoration: none;
    outline: none;
    color: white;
    background-color: ${props => props.theme.buttonColor};
    padding: 5px 8px;
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggleAuthenticated = this._toggleAuthenticated.bind(this);
    this.state = {
      authenticated: document ? !!localStorage.getItem(constants.USER_PRPFILE) : false,
      toggleAuthenticated: this.toggleAuthenticated,
      csrfToken: '',
    }
  }

  _toggleAuthenticated (value) {
    this.setState({
      authenticated: value,
    }, () => {
      if (!value) {
        localStorage.removeItem(constants.USER_PRPFILE);
        fetch(`${resourceServerOrigin}/user/signout`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          referrerPolicy: 'no-referrer',
          credentials: 'include'
        })
      }
    })
  }

  componentDidMount() {
    fetch(`${resourceServerOrigin}/initialization`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
    .then(async (response) => {
      const data = await response.json();
      const { csrfToken } = data;
      this.setState({
        csrfToken,
      })
    })
  }

  render() {
    const { authenticated, csrfToken } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Helmet>
          <meta name="csrf-token" content={csrfToken} />
        </Helmet>
        <Router>
          <AuthenticationContext.Provider value={this.state}>
            <Navigation />
            <Layout>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/sign-in">
                 { authenticated ? <Redirect to='/dashboard' />  : <SignIn /> }
                </Route>
                <Route path="/login-callback">
                  <LoginCallback />
                </Route>
                <Route path="/sign-up">
                  <SignUp />
                </Route>
                <Route path="/dashboard">
                  { authenticated ? <Dashboard />  : <Redirect to='/' />}
                </Route>
              </Switch>
            </Layout>
          </AuthenticationContext.Provider>
        </Router>
        <GlobalStyle />
      </ThemeProvider>
    );
  }
}

export default App;
