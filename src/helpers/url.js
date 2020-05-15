const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

const getBaseUrl = (ctx) => {
  return ctx
    ? `${protocol}://${ctx.req.headers.host}`
    : `${protocol}://${window.location.host}`;
};

export { getBaseUrl, protocol };
