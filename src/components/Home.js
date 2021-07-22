import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  p {
    font-size: 40px;
  }
`;


function Home() {
  return (
    <Container>
      <p>This is home Page. Please login first so you can browse dashboard page</p>
    </Container>
  );
}

export default Home;
