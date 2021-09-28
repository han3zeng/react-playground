import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 50px;
  p, h1 { text-align: center; }
`;

function NoMatch() {
  return (
    <Container>
      <p>Page Not Found</p>
      <h1>404</h1>
    </Container>
  )
}

export default NoMatch;
