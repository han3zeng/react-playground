import styled from 'styled-components';
import OAuth from './OAuth';
import Password from './Password';

const H2 = styled.h2`
  text-align: center;
  margin:
`;

const Container = styled.div`
  width: 400px;
  margin: 0 auto 50px auto;
`;

const Divider = styled.div`
  text-align: center;
  font-size: 20px;
  color: #333;
  margin: 30px 0;
`;

function SignIn() {
  return (
    <>
      <H2>Sign In</H2>
      <Container>
        <Password />
        <Divider>or</Divider>
        <OAuth />
      </Container>
    </>
  );
}
export default SignIn;
