// import produce from "immer";
import config from '../config';
import constants from '../constants';
import { setCookie } from './miscellaneous';

const { resourceServerOrigin, domain } = config;
const { REDIRECT_CSRF_KEY, USER_PRPFILE } = constants;

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
  return password.length >= 8 && regex.test(password);
};

const signIn = ({ accessToken }) => new Promise((resolve, reject) => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  fetch(`${resourceServerOrigin}/user/sign-in`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'CSRF-Token': csrfToken,
    },
    referrerPolicy: 'no-referrer',
    credentials: 'include',
  })
    .then((response) => {
      response.json().then((response) => {
        const { data, ok, message } = response;
        if (ok) {
          const {
            name, email, avatarURL, sub, authorizationServer,
          } = data;
          localStorage.setItem(
            USER_PRPFILE,
            JSON.stringify({
              name, email, avatarURL, sub, authorizationServer,
            }),
          );
          setCookie('signIn', '1', {
            domain,
          });
          sessionStorage.removeItem(REDIRECT_CSRF_KEY);
          resolve();
        } else {
          console.log('error message: ', message);
          reject();
        }
      });
    })
    .catch(() => {
      console.log('error');
      reject();
    });
});

const form = {
  emailValidation,
  passwordPrimitiveValidation,
  signIn,
};

export default form;
