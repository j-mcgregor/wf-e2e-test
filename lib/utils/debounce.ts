const debounce = (func: any, timeout: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: []) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};
export default debounce;
