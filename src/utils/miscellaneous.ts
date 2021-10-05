function debounce<F extends ((...args: any) => any)>(fn: F, interval: number) {
  let timerId: number;
  return function decorator(this: any, ...args: any) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = window.setTimeout(() => {
      return fn.apply(this, args)
    }, interval)
  }
}

export {
  debounce,
}
