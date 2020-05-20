const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

const getBaseUrl = () => {
  return `${protocol}://${process.env.BASE_URL}`;
};

export { getBaseUrl, protocol };
