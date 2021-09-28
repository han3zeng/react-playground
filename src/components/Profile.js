import React from 'react';
import styled from 'styled-components';
import userIcon from '../assets/user.svg';


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

function Profile () {
  const userProfile = JSON.parse(localStorage.getItem('userProfile'));
  const { name, email, avatarURL } = userProfile;
  return (
    <Container>
      <Content>
        <img src={avatarURL || userIcon} alt={`${name} user profile`} />
        <div>name: {name}</div>
        <div>email: {email}</div>
      </Content>
    </Container>
  );
};


export default Profile;
