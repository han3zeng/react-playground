import { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { AuthProvider } from '../src/contexts';
import Navigation from '../src/components/Navigation';
import Layout from '../src/components/Layout';
import client from '../src/api/apollo-client';
import config, { breakpoints } from '../src/config';

const { resourceServerOrigin } = config;

const theme = {
  inputBorderColor: '#BEBEBE',
  buttonColor: '#326891',
  sectionMargin: '68px',
  pageMargin: '20px;',
  headerColor: '#121212',
  contentColor: '#333333',
  captionColor: '#666666',
  fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
};

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body {
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
    font-size: 46px;
    line-height: 130%;
    @media(max-width: ${breakpoints.maxTablet}px) {
      font-size: 36px;
    }
  }

  h2 {
    color: ${props => props.theme.headerColor};
    font-size: 42px;
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
    cursor: pointer;
  }

  input, textarea, button {font-family: inherit}

  button {
    border: none;
    text-decoration: none;
    outline: none;
    color: white;
    background-color: ${props => props.theme.buttonColor};
    padding: 5px 8px;
    cursor: pointer;
  }
`;

function MyApp({ Component, pageProps }) {
  const [csrfToken, setCSRFToken] = useState(null);
  useEffect(() => {
    fetch(`${resourceServerOrigin}/initialization`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(async (response) => {
        const data = await response.json();
        const { csrfToken: token } = data;
        setCSRFToken(token);
      })
      .catch((e) => {
        console.log('e: ', e);
      })
  }, []);
  return (
    <>
      <Head>
        <meta name="csrf-token" content={csrfToken} />
      </Head>
      <ApolloProvider
        client={client}
      >
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Navigation />
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <GlobalStyle />
          </ThemeProvider>
        </AuthProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
