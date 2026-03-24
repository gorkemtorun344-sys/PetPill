// Production-safe logger — only logs in development mode
export const log = (...args) => {
  if (__DEV__) console.log(...args);
};

export const logError = (message, error) => {
  if (__DEV__) console.error(message, error);
};

export const logWarn = (...args) => {
  if (__DEV__) console.warn(...args);
};
