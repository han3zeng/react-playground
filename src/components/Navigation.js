import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AuthenticationContext } from '../contexts';

const StyledLink  = styled(Link)`
  position: relative;
  &:after {
    transition: opacity 0.3s ease-in-out;
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    height: 1px;
    width: 100%;
    background-color: ${props => props.theme.buttonColor};
    opacity: ${props => props.isShowing ? '1' : '0'};
  }
`;

const Container = styled.div`
  width: 100%;
  font-size:  20px;
  padding: 10px 15px;
  box-shadow: 0 3px 3px #E9E9E9;
  box-sizing: border-box;
`;

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
    id: 'home',
    label: 'Home',
    path: '/'
  }
]

const signedLinks = [
  {
    id: 'profile',
    label: 'Profile',
    path: '/profile',
  },
  {
    id: 'newStory',
    label: 'Write a story',
    path: '/new-story',
  },
  {
    id: 'stories',
    label: 'Stories',
    path: '/stories',
  }
]

function Navigation () {
  const location = useLocation();
  const defaultTabData = signedLinks.find(element => element.path === location.pathname);
  const defaultTabId = defaultTabData ? defaultTabData.id : '';
  const [ tab, setTab ] = useState(defaultTabId);
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
            }}>
              Sign out
            </Button>
          ) : (
            <StyledLink
              to="/sign-in"
            >
              Sign in
            </StyledLink>
          )
          const linkData = authenticated ? signedLinks : defaultLinks ;
          const Links = linkData.map(({
            path,
            label,
            id
          }) => (
            <StyledLink
              key={`${path}`}
              to={`${path}`}
              onClick={() => {
                setTab(id)
              }}
              isShowing={tab === id}
            >
              {label}
            </StyledLink>
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
