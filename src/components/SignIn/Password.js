import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import InputRow from '../InputRow';
import useForm from '../../hooks/useForm';
import styled from 'styled-components';
import config from '../../config';
import { AuthenticationContext } from '../../contexts';
const { authServerOrigin } = config;

const Button = styled.button`
  font-size: 18px;
  margin: 30px auto 0 auto;
  display: block;
  border-radius: 3px;
  padding: 14px 28px;
  opacity: ${props => props.allowed ? 1 : 0.65};
  &:hover {
    cursor: ${props => props.allowed ? 'pointer' : 'not-allowed'};
  }
`;

const Error = styled.div`
  font-size: 12px;
  color: red;
  text-align: center;
  margin-top: 10px;
`;

function Password () {
  const authentication = useContext(AuthenticationContext);
  const history = useHistory();
  const {
    form,
    error,
    onHandleInput,
    onSubmitHandler,
    stages,
    stage
  } = useForm()

  const allowed = !error.email && !error.password && !!form.email && !!form.password;

  const onSubmitCallBack = () => {
    authentication.toggleAuthenticated(true);
    history.push('/profile');
  }

  return (
    <>
      <InputRow
        labelName="Email"
        name="email"
        type="email"
        error={error}
        onHandleInput={onHandleInput}
      />
      <InputRow
        labelName="Password"
        name="password"
        type="password"
        error={error}
        onHandleInput={onHandleInput}
      />
      <Button
        allowed={allowed}
        onClick={() => {
          if (allowed) {
            onSubmitHandler({
              url: `${authServerOrigin}/account/sign-in`,
              isSignIn: true,
            })
            .then(() => {
              onSubmitCallBack();
            })
            .catch(() => {

            })
          }
        }}
      >
        Sign In
      </Button>
      {stage.status === stages.error && <Error>{stage.message}</Error>}
    </>
  );
}
export default Password;
