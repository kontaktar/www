import React from "react";

import PropTypes from "prop-types";
import fetch from "isomorphic-unfetch";
// import Link from "next/link";
import { FrontPageContainer, MainLayout } from "layouts";

// const handleClick = () => {
//   return <Link href="/login" prefetch />;
// };
const LandingPage = ({ user, status }) => (
  <MainLayout>
    <FrontPageContainer />
    {/* <Link href="/login">
      <Button onClick={handleClick}>Innskráning</Button>
    </Link> */}
    {/* http://localhost:3000/?id=1 */}

    {/* {status === 200 ? <p>{user.name}</p> : null} */}
  </MainLayout>
);

LandingPage.getInitialProps = async ({ query, req }) => {
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = process.browser
    ? `${protocol}://${window.location.host}`
    : `${protocol}://${req.headers.host}`;

  const response = await fetch(`${baseUrl}/api/users/${query.id}`);
  const user = await response.json();
  return { user, status: response.status };
};

LandingPage.propTypes = {
  user: PropTypes.object,
  status: PropTypes.number
};

LandingPage.defaultProps = {
  user: {},
  status: 0
};

export default LandingPage;
