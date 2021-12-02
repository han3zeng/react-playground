const loginServices = {
  GITHUB: 'github',
  GOOGLE: 'google',
  ACCOUNT: 'account',
};

export const PATH = {
  profile: 'profile',
  signIn: 'sign-in',
  signUp: 'sign-up',
  stories: 'stories',
  story: 'story',
};

const index = {
  REDIRECT_CSRF_KEY: 'redirectCSRFKey',
  USER_PRPFILE: 'userProfile',
  ...loginServices,
};

export default index;
