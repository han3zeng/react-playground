import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  font-size:  30px;
  padding: 10px 5px;
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

function Navigation () {
  return (
    <Container>
      <Nav>
        <LeftDivision>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
        </LeftDivision>
        <Link to="/login">Login</Link>
      </Nav>
    </Container>
  );
}

export default Navigation;
