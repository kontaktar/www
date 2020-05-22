// eslint-disable-next-line import/prefer-default-export
export const removeEmpty = (object) => {
  Object.keys(object).forEach(
    (key) =>
      !object[key] &&
      object[key] !== undefined &&
      // eslint-disable-next-line no-param-reassign
      delete object[key]
  );
  return object;
};
