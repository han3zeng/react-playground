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

const getCookies = () => {
  if (document) {
    const str = document.cookie.split(';');
    const result = {};
    for (let i = 0; i < str.length; i += 1) {
      const cur = str[i].split(/=(.+)/);
      result[cur[0]] = cur[1];
    }
    return result;
  }
  return undefined;
};

export {
  getCookies,
};
