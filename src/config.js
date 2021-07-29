const config = {
  githubClientId: '3f488128d8bad7618828',
  googleCleintId: '948822456218-4miu2cdg1tp908o5r7144g5pr1900d6n.apps.googleusercontent.com',
  redirectUrl: 'http://localhost:3000/login-callback',
  authServerOrigin: 'http://localhost:8080',
  resourceServerOrigin: 'http://localhost:8081',
};

const breakpoints = {
  maxDesktop: '1440',
  minDesktop: '1024',
  maxTablet: '1023',
  minTablet: '768',
  maxMobile: '767',
  maxiPhone: '414',
}

const styleConfig = {
  textMaxWidth: '400',
}

export default config;

export {
  breakpoints,
  styleConfig
}
