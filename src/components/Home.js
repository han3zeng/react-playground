import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  p {
    font-size: 20px;
  }
`;


function Home() {
  return (
    <Container>
      <h2>Overview</h2>
      <p>This is the Han's playground to practice web development related subjects.</p>
      <p>Currently, I have been working on personal blog, authorization and authentication system.</p>
      <h2>How to use the Site?</h2>
      <p>Sign up or Sign in first, then you can have your own blog.</p>
    </Container>
  );
}

export default Home;
