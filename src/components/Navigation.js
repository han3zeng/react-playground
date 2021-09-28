import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthenticationContext } from '../contexts';

const Container = styled.div`
  width: 100%;
  font-size:  20px;
  padding: 10px 15px;
  box-shadow: 0 3px 3px #E9E9E9;
  box-sizing: border-box;
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
`

const LeftDivision = styled.div`
  > a:not(:last-child) {
    margin-right: 20px;
  }
`

const Button = styled.div`
  cursor: pointer;
`

const defaultLinks = [
  {
    label: 'Home',
    path: '/'
  }
]

const signedLinks = [
  {
    label: 'Profile',
    path: '/profile',
  },
  {
    label: 'Write a story',
    path: '/new-story',
  }
]

function Navigation () {
  return (
    <AuthenticationContext.Consumer>
      {
        ({ authenticated, toggleAuthenticated }) => {
          const signOutHandler = () => {
            toggleAuthenticated(false);
          }
          const User = authenticated ? (
            <Button onClick={() => {
              signOutHandler();
            }}>Sign out</Button>
          ) : <Link to="/sign-in">Sign in</Link>
          const linkData = authenticated ? signedLinks : defaultLinks ;
          const Links = linkData.map((link) => (
            <Link
              to={`${link.path}`}
            >
              {link.label}
            </Link>
          ));
          return (
            <Container>
              <Nav>
                <LeftDivision>
                  {Links}
                </LeftDivision>
                {User}
              </Nav>
            </Container>
          );
        }
      }
    </AuthenticationContext.Consumer>
  );
}

export default Navigation;
