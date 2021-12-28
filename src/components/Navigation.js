import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import useAuth from '../hooks/useAuth';

const StyledLinkWrapper = styled.span`
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
      background-color: ${(props) => props.theme.buttonColor};
      opacity: ${(props) => (props.isShowing ? '1' : '0')};
    }
  }
`;

const StyledLink = (props) => {
  const { href, children } = props;
  return (
    <StyledLinkWrapper
      {...props}
    >
      <Link
        href={href}
      >
        {children}
      </Link>
    </StyledLinkWrapper>
  );
};

const Container = styled.div`
  width: 100%;
  font-size:  20px;
  padding: 0 15px;
  box-shadow: 0 3px 3px #E9E9E9;
  box-sizing: border-box;
  height: 50px;
`;

const Nav = styled.nav`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftDivision = styled.div`
  span:not(:last-child) {
    margin-right: 20px;
  }
`;

const Button = styled.div`
  cursor: pointer;
`;

const defaultLinks = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
  },
];

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
  },
];

function Navigation() {
  const router = useRouter();
  const { authenticated, isLoading, toggleAuthenticated } = useAuth();
  const [tab, setTab] = useState('');
  const linkData = authenticated ? signedLinks : defaultLinks;

  useEffect(() => {
    const tabData = signedLinks.find((element) => element.path === router.pathname);
    const tabId = tabData ? tabData.id : '';
    setTab(tabId);
  }, [router]);

  if (isLoading) {
    return <Container />;
  }

  const signOutHandler = () => {
    router.push('/');
    toggleAuthenticated(false);
  };

  const User = authenticated ? (
    <Button onClick={() => {
      signOutHandler();
    }}
    >
      Sign out
    </Button>
  ) : (
    <StyledLink
      href="/sign-in"
    >
      Sign in
    </StyledLink>
  );

  const Links = linkData.map(({
    path,
    label,
    id,
  }) => (
    <StyledLink
      key={`${path}`}
      href={`${path}`}
      onClick={() => {
        setTab(id);
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

export default Navigation;
