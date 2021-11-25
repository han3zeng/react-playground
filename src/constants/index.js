const loginServices = {
  GITHUB: 'github',
  GOOGLE: 'google',
  ACCOUNT: 'account',
};

export const PATH = {
  profile: 'profile',
  signIn: 'sign-in',
  signUp: 'sign-up',
};

const index = {
  CSRF_KEY: 'csrfKey',
  USER_PRPFILE: 'userProfile',
  ...loginServices,
};

export default index;
