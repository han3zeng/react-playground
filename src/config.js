const config = {
  nodeEnv: process.env.NODE_ENV,
  githubClientId: process.env.NODE_ENV === 'production' ? 'bc32cf5b344432cf78cb' : '3f488128d8bad7618828',
  googleCleintId: '137621437327-lp61tg8a7ks6t4hbs33mvlri11t8fo0v.apps.googleusercontent.com',
  redirectPath: 'login-callback',
  origin: process.env.NODE_ENV === 'production' ? 'https://react-playground-7kgn6zbeya-uc.a.run.app' : 'http://localhost:3000',
  authServerOrigin: process.env.NODE_ENV === 'production' ? 'https://authorization-server-7kgn6zbeya-uc.a.run.app' : 'http://localhost:8080',
  resourceServerOrigin: process.env.NODE_ENV === 'production' ? 'https://resource-server-7kgn6zbeya-uc.a.run.app' : 'http://localhost:8081'
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
