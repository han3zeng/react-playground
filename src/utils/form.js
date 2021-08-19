import produce from "immer";
import config from '../config';
import constants from '../constants';

const {
  resourceServerOrigin,
} = config;
const {
  CSRF_KEY,
  USER_PRPFILE
} = constants;

const emailValidation = (email) => {
  if (typeof email !== 'string') {
    return false;
  }
  const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return regex.test(email);
};

const passwordPrimitiveValidation = (password) => {
  if (typeof password !== 'string') {
    return false;
  }
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/;
  return (password.length >= 8) && regex.test(password);
}

const signIn = ({ accessToken }) => {
  return new Promise((resolve, reject) => {
    fetch(`${resourceServerOrigin}/user/sign-in`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      referrerPolicy: 'no-referrer',
      credentials: 'include'
    })
      .then((response) => {
        response.json()
          .then((response) => {
            const { data, ok, message } = response;
            if (ok) {
              const { name, email, avatarURL } = data
              localStorage.setItem(USER_PRPFILE, JSON.stringify({ name, email, avatarURL }));
              sessionStorage.removeItem(CSRF_KEY)
              resolve();
            } else {
              console.log('error message: ', message)
              reject();
            }
          })
      })
      .catch(() => {
        console.log('error')
        reject();
      })
  })
}


const form = {
  emailValidation,
  passwordPrimitiveValidation,
  signIn
}

export default form;
