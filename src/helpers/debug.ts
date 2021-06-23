/* eslint-disable no-console */

const isActivated = process.env.NODE_ENV === "development";
export const debug = (string: string): void => {
  if (isActivated) {
    console.log(string);
  }
};
export const debugWarn = (string: string): void => {
  if (isActivated) {
    console.warn(string);
  }
};
export const debugError = (string: string): void => {
  if (isActivated) {
    console.error(string);
  }
};
