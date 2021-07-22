import React from "react";
import Home from "./components/Home";
import LoginCallback from "./components/LoginCallback";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Navigation from "./components/Navigation";
import Layout from "./components/Layout";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { breakpoints } from "./config";
import { AuthenticationContext } from './contexts'

const theme = {
  buttonColor: "#326891",
  sectionMargin: "68px",
  pageMargin: "20px;",
  headerColor: "#121212",
  contentColor: "#333333",
  captionColor: "#666666",
  fontFamily: 'georgia,"times new roman", times, serif'
};

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    font-family: ${props => props.theme.fontFamily};
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
    margin-bottom: 2em;
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
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggleAuthenticated = this._toggleAuthenticated.bind(this);
    this.state = {
      authenticated: false,
      toggleAuthenticated: this.toggleAuthenticated
    }
  }

  _toggleAuthenticated (value) {
    this.setState({
      authenticated: value,
    })
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <AuthenticationContext.Provider value={this.state}>
            <Navigation />
            <Layout>
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/login-callback">
                  <LoginCallback />
                </Route>
                <Route path="/dashboard">
                  <Dashboard />
                </Route>
                <Route path="/">
                  <Home />
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
