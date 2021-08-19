import React, { useState } from 'react';
import { debounce } from 'lodash';
import { form as formUtils } from '../utils';

const _ = {
  debounce,
};

const stages = {
  preSubmit: 'preSubmit',
  postSubmit: 'postSubmit',
  error: 'error',
  message: null,
}

const {
  emailValidation,
  passwordPrimitiveValidation
} = formUtils;

function useForm() {
  const [stage, setStage] = useState({
    status: stages.preSubmit,
    message: null,
  });
  const [error, setError] = useState({
    username: null,
    password: null,
    email: null,
  })
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: null,
  });

  const validation = (e) => {
    const { value, name } = e.target;
    if (name === 'email') {
      if (!value || emailValidation(value)) {
        const nextState = {
          ...error,
          email: null,
        }
        setError(nextState);
      } else if(!emailValidation(value)) {
        const nextState = {
          ...error,
          email: 'please enter valid email address',
        }
        setError(nextState);
      }
    } else if (name === 'password') {
      if (!value || passwordPrimitiveValidation(value)) {
        const nextState = {
          ...error,
          password: null,
        }
        setError(nextState);
      } else if(!passwordPrimitiveValidation(value)) {
        const nextState = {
          ...error,
          password: 'Enter a combination of at least 8 characters which should include at least 1 lowercase letter, 1 uppercase letter and 1 number',
        }
        setError(nextState);
      }
    }
  };

  const onHandleInput = _.debounce((e) => {
    validation(e);
    setForm(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    });
  }, 500);

  const onSubmitHandler = async ({
    url,
  }) => {
    try {
      const options = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          ...form
        }),
      }
      const response = await fetch(`${url}`, options);
      const result = await response.json();
      const { ok, message } = result;
      if (ok) {
        setStage({
          status: stages.postSubmit,
          message,
        });
      } else {
        setStage({
          status: stages.error,
          message,
        });
      }
    } catch(e) {
      console.log('error: ', e)
    }
  }

  return {
    form,
    error,
    setForm,
    setError,
    onHandleInput,
    onSubmitHandler,
    stage,
    stages
  }
}

export default useForm
