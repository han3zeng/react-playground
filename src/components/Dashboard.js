import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 100px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  > img {
    height: 100px;
    width: 100px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

function Dashboard () {
  const userProfile = JSON.parse(localStorage.getItem('userProfile'));
  console.log('userProfile: ', userProfile)
  const { name, email, avatarURL } = userProfile;
  return (
    <Container>
      <Content>
        <img src={avatarURL} alt={`${name} profile image`} />
        <div>{name}</div>
        <div>{email}</div>
      </Content>
    </Container>
  );
}


export default Dashboard;
