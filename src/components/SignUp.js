import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { signUp } from '../utils';
import produce from "immer";
import { debounce } from 'lodash';
import config from '../config';

const _ = {
  debounce,
};

const {
  emailValidation,
  passwordPrimitiveValidation
} = signUp;

const Conatiner = styled.div`
  width: 380px;
  box-sizing: border-box;
  margin: 50px auto;
  label {
    display: block;
    font-size: 16px;
    color: #333;
  }
  input {
    box-sizing: border-box;
    width: 100%;
    padding: 8px 5px;
  }
`;

const Row = styled.div`
  margin-bottom: 10px;
`;

const SubRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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

function SignUp() {
  const [stage, setStage] = useState('signUp');
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: null,
    error: {
      password: null,
      email: null,
    },
  });

  const allowed = !form.error.email && !form.error.password && !!form.email && !!form.password && !!form.username;
  const onHandleInput = _.debounce((e) => {
    validation(e);
    setForm(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    });
  }, 500);

  const validation = (e) => {
    const { value, name } = e.target;
    if (name === 'email') {
      if (!value || emailValidation(value)) {
        const nextState = produce(form, draftState => {
          draftState.error.email = null;
        })
        setForm(nextState);
      } else if(!emailValidation(value)) {
        const nextState = produce(form, draftState => {
          draftState.error.email = 'please enter valid email address';
        })
        setForm(nextState);
      }
    } else if (name === 'password') {
      if (!value || passwordPrimitiveValidation(value)) {
        const nextState = produce(form, draftState => {
          draftState.error.password = null;
        })
        setForm(nextState);
      } else if(!passwordPrimitiveValidation(value)) {
        const nextState = produce(form, draftState => {
          draftState.error.password = 'Enter a combination of at least 8 characters which should include at least 1 lowercase letter, 1 uppercase letter and 1 number';
        })
        setForm(nextState);
      }
    }
  };

  const inputRow = ({
    labelName,
    name,
    type,
  }) => {
    const errorMessage = form.error[name];
    return (
      <Row>
        <SubRow>
          <label>{labelName}</label>
          {errorMessage && <Error>{errorMessage}</Error>}
        </SubRow>
        <input
          name={name}
          type={type}
          onChange={onHandleInput}
        />
      </Row>
    );
  }

  const onSubmitHandler = () => {
    if (allowed) {

    }
  }

  const content = () => {
    if (stage === 'signUp') {
      return (
        <div>
          <Row>
            <label>Username</label>
            <input
              name="username"
              type="text"
              onChange={onHandleInput}
              defaultValue=""
            />
          </Row>
          {inputRow({ labelName: "Email", name: "email" ,type: "email"})}
          {inputRow({ labelName: "Password", name: "password" ,type: "password"})}
          <Button
            allowed={allowed}
            onClick={onSubmitHandler}
          >
            Sign Up
          </Button>
        </div>
      );
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
