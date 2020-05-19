/* eslint-disable consistent-return */
import React, { Component } from "react";
import Router from "next/router";
import nextCookie from "next-cookies";
import cookie from "js-cookie";

// SEE: https://github.com/whoisryosuke/nextjs-oauth2-cookie-auth/blob/master/utils/AuthService.js
const TOKEN_NAME = "spez_user_token";
async function login({ username }) {
  const url = `/api/login`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });
    if (response.ok) {
      const { token } = await response.json();
      cookie.set(TOKEN_NAME, token, { expires: 1 });
      Router.push("/profile");
    } else {
      // https://github.com/developit/unfetch#caveats
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  } catch (error) {
    console.error("Login failed ", error);
  }
}

function logout() {
  cookie.remove(TOKEN_NAME);
  // to support logging out from all windows
  window.localStorage.setItem("logout", Date.now());
  Router.push("/login");
}

// Gets the display name of a JSX component for dev tools
const getDisplayName = (component) =>
  component.displayName || component.name || "Component";

function useAuth() {
  // TODO: this is just a temporary auth-like behaviour,
  // look into this: https://auth0.com/blog/handling-authentication-in-react-with-context-and-hooks/
  const checkCookie = (ctx) => {
    const { spez_user_token: token } = nextCookie(ctx);
    return token === "my-token";
  };
  return {
    isLoggedIn: cookie.get(TOKEN_NAME) === "my-token",

    // call this in getInitialProps for logged in status for pages
    isLoggedInServerSide: (ctx) => checkCookie(ctx)
  };
}
function withAuth(WrappedComponent) {
  class WithAuth extends Component {
    static async getInitialProps(ctx) {
      const token = auth(ctx);
      const componentProperties =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return {
        ...componentProperties,
        token,
        isLoggedIn: token === "my-token" // TODO: temp
      };
    }

    constructor(props) {
      super(props);

      this.syncLogout = this.syncLogout.bind(this);
    }

    componentDidMount() {
      window.addEventListener("storage", this.syncLogout);
    }

    componentWillUnmount() {
      window.removeEventListener("storage", this.syncLogout);
      window.localStorage.removeItem("logout");
    }

    syncLogout(event) {
      if (event.key === "logout") {
        console.log("logged out from storage!");
        Router.push("/login");
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  WithAuth.displayName = `withAuth(${getDisplayName(WrappedComponent)})`;
  return WithAuth;
}

function auth(ctx) {
  // eslint-disable-next-line camelcase
  const { spez_user_token: token } = nextCookie(ctx);
  /*
   * This happens on server only, ctx.req is available means it's being
   * rendered on server. If we are on server and token is not available,
   * means user is not logged in.
   */
  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
    return;
  }

  // We already checked for server. This should only happen on client.
  if (!token) {
    Router.push("/login");
  }

  return token;
}
export { auth, login, logout, withAuth, useAuth };
