import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useAuth from '../src/hooks/useAuth';
import { _ } from '../src/utils';
import userIcon from '../src/assets/user.svg';

const { getCookies } = _;

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

function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    avatarURL: '',
  });
  const { name, email, avatarURL } = profile;

  useEffect(() => {
    const cookies = getCookies();
    let userProfile = cookies && cookies['user-profile'];
    try {
      userProfile = userProfile ? JSON.parse(userProfile) : undefined;
      if (userProfile) {
        setProfile({
          name: userProfile.name,
          email: userProfile.email,
          avatarURL: userProfile.avatarURL,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <Container>
      <Content>
        <img src={avatarURL || userIcon.src} alt={`${name} user profile`} />
        <div>{`name: ${name}`}</div>
        <div>{`email: ${email}`}</div>
      </Content>
    </Container>
  );
}

export default Profile;
