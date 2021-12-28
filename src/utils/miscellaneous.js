// function debounce<F extends ((...args: any) => any)>(fn: F, interval: number) {
//   let timerId: number;
//   return function decorator(this: any, ...args: any) {
//     if (timerId) {
//       clearTimeout(timerId);
//     }
//     timerId = window.setTimeout(() => {
//       return fn.apply(this, args)
//     }, interval)
//   }
// }

const getCookie = ({ name }) => {
  if (document) {
    const str = document.cookie.split(';');
    for (let i = 0; i < str.length; i += 1) {
      const nameValue = str[i].split(/=(.+)/);
      if (nameValue[0] === name) return nameValue[1];
    }
    return undefined;
  }
  return undefined;
};

function setCookie(name, value, options = {}) {
  const finalOptions = {
    path: '/',
    ...options,
  };

  if (finalOptions.expires instanceof Date) {
    finalOptions.expires = finalOptions.expires.toUTCString();
  }

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  Object.keys(finalOptions).forEach((optionKey) => {
    updatedCookie += `; ${optionKey}`;
    const optionValue = finalOptions[optionKey];
    if (optionValue !== true) {
      updatedCookie += `=${optionValue}`;
    }
  });

  document.cookie = updatedCookie;
}

function deleteCookie({
  name,
  options,
}) {
  setCookie(name, '', { 'max-age': -1, ...options });
}

export { getCookie, setCookie, deleteCookie };
