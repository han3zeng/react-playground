import React from 'react';
import styled, { keyframes } from 'styled-components';
import refreshIcon from '../assets/refresh-icon.svg';

const rotate = keyframes`
  fromm {
    transofrm: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Container = styled.div`
  animation: ${rotate} 2s linear infinite;
  display: inline-block;
  position: relativel;
  > img {
    height: 50px;
    width: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;


function Loading() {
  return (
    <Container>
      <img src={refreshIcon.src} alt="loading icon" />
    </Container>
  )
}

export default Loading;
