/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-console */

const isActivated = process.env.NODE_ENV === "development";

export const debug = (string: string, object?: any): void => {
  if (isActivated) {
    console.log(string, object ?? "");
  }
};
export const debugWarn = (string: string, object?: any): void => {
  if (isActivated) {
    console.warn(string, object ?? "");
  }
};
export const debugError = (string: string, object?: any): void => {
  if (isActivated) {
    console.error(string, object ?? "");
  }
};

export const time = (string: string): void => {
  if (isActivated) {
    console.time(string);
  }
};

export const timeEnd = (string: string): void => {
  if (isActivated) {
    console.timeEnd(string);
  }
};
