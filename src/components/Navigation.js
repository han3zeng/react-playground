import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AuthenticationContext } from '../contexts';

const StyledLinkWrapper  = styled.span`
  a {
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
  }
`;

const StyledLink = (props) => {
  const { to, children } = props;
  return (
    <StyledLinkWrapper
      {...props}
    >
      <Link
        to={to}
      >
        {children}
      </Link>
    </StyledLinkWrapper>
  )
}

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
  span:not(:last-child) {
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
  const [ tab, setTab ] = useState('');
  useEffect(() => {
    const tabData = signedLinks.find(element => element.path === location.pathname);
    const tabId =  tabData ? tabData.id : '';
    setTab(tabId)
  }, [location])
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
