// eslint-disable-next-line import/prefer-default-export
export const removeEmpty = (object) => {
  Object.keys(object).forEach(
    (key) =>
      !object[key] &&
      typeof object[key] !== "boolean" &&
      object[key] !== undefined &&
      // eslint-disable-next-line no-param-reassign
      delete object[key]
  );
  return object;
};
