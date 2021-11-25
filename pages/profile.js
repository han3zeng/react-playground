import React, { useEffect, useState } from 'react';
import useAuth from '../src/hooks/useAuth';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import userIcon from '../src/assets/user.svg';

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
  const { authenticated } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    avatarURL: '',
  });
  useEffect(() => {
    if (!authenticated) {
      router.push('/');
    }
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (userProfile) setProfile(userProfile);
  }, [authenticated, router]);

  const { name, email, avatarURL } = profile;
  return (
    <Container>
      <Content>
        <img src={avatarURL || userIcon} alt={`${name} user profile`} />
        <div>{`name: ${name}`}</div>
        <div>{`email: ${email}`}</div>
      </Content>
    </Container>
  );
}

export default Profile;
