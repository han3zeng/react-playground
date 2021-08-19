import OAuth from './OAuth';
import styled from 'styled-components';
import Password from './Password';

const H2 = styled.h2`
  text-align: center;
`;

const Container = styled.div`
  width: 400px;
  margin: 0 auto;
`;

const Divider = styled.div`
  text-align: center;
  font-size: 20px;
  color: #333;
  margin: 50px 0;
`;

function SignIn () {
  return (
    <>
      <H2>Sign In</H2>
      <Container>
        <Password />
        <Divider>or</Divider>
        <OAuth />
      </Container>
    </>
  )
}
export default SignIn;
