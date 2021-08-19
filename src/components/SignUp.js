import React, { useState } from 'react';
import styled from 'styled-components';
import InputRow from './InputRow';
import useForm from '../hooks/useForm';
import config from '../config';
const { authServerOrigin } = config;

const Conatiner = styled.div`
  width: 380px;
  box-sizing: border-box;
  margin: 50px auto;
`;

const H2 = styled.h2`
  text-align: center;
`;

const Button = styled.button`
  font-size: 20px;
  float: right;
  border-radius: 3px;
  margin-top: 10px;
  opacity: ${props => props.allowed ? 1 : 0.65};
  &:hover {
    cursor: ${props => props.allowed ? 'pointer' : 'not-allowed'};
  }
`;

const Error = styled.div`
  font-size: 12px;
  color: red;
`;

const SignUpInfo = styled.p`
  text-align: center;
`

function SignUp() {
  const {
    form,
    error,
    stage,
    onHandleInput,
    onSubmitHandler,
    stages
  } = useForm()

  const allowed = !error.email && !error.password && !!form.email && !!form.password && !!form.username;

  const content = () => {
    if (stage.status !== stages.postSubmit) {
      return (
        <div>
          <InputRow
            labelName="Username"
            name="username"
            type="text"
            error={error}
            onHandleInput={onHandleInput}
          />
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
                  url: `${authServerOrigin}/account/authorize`,
                });
              }
            }}
          >
            Sign Up
          </Button>
          {stage.status === stages.error && <Error>{stage.message}</Error>}
        </div>
      );
    } else if (stage.status === stages.postSubmit) {
      return (
        <SignUpInfo>
          {`You wil receive a mail at ${form.email}.`}
          <br />
          Please click the link in the mail to intiate your account.
        </SignUpInfo>
      )
    } else {
      return null;
    }
  }

  return (
    <Conatiner>
      <H2>Sign Up</H2>
      {content()}
    </Conatiner>
  )
}

export default SignUp;
