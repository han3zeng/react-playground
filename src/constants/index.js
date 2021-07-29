const loginServices = {
  GITHUB: 'github',
  GOOGLE: 'google',
}

const index = {
  CSRF_KEY: 'csrfKey',
  USER_PRPFILE: 'userProfile',
  ...loginServices,
}

export default index;
