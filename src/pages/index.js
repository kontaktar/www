import React from "react";

import PropTypes from "prop-types";
import fetch from "isomorphic-unfetch";
import { Button } from "components";

const LandingPage = ({ user, status }) => (
  <div>
    <Button>Lol</Button>
    <h1>Simple Storybook Example</h1>
    {/* http://localhost:3000/?id=1 */}
    {status === 200 ? <p>{user.name}</p> : <p>test</p>}
  </div>
);

LandingPage.getInitialProps = async ({ query, req }) => {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  const baseUrl = process.browser
    ? `${protocol}://${window.location.host}`
    : `${protocol}://${req.headers.host}`;

  const response = await fetch(`${baseUrl}/api/users/${query.id}`);

  const user = await response.json().name;
  return { user, status: response.status };
};

LandingPage.propTypes = {
  user: PropTypes.string,
  status: PropTypes.number,
};

LandingPage.defaultProps = {
  user: "",
  status: 0,
};

export default LandingPage;
