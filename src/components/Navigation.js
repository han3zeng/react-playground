import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  font-size:  30px;
  padding: 10px 5px;
  box-shadow: 0 3px 3px #E9E9E9;
`;

const Nav = styled.nav`
  > a:not(:last-child) {
    margin-right: 20px;
  }
`

function Navigation () {
  return (
    <Container>
      <Nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </Nav>
    </Container>
  );
}

export default Navigation;
