const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

const getBaseUrl = () => {
  if (
    typeof window !== "undefined" &&
    window &&
    window.location &&
    window.location.origin
  ) {
    return window.location.origin;
  }

  if (
    process.env.BASE_URL.includes("localhost") &&
    process.env.BASE_URL.includes("http")
  ) {
    return `${process.env.BASE_URL}`;
  }
  if (process.env.BASE_URL.includes("localhost")) {
    return `http://${process.env.BASE_URL}`;
  }
  return `${protocol}://${process.env.BASE_URL}`;
};

export { getBaseUrl, protocol };
