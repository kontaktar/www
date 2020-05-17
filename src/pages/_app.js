import React from "react";
import App from "next/app";
import Head from "next/head";
import { END } from "redux-saga";
import { wrapper } from "../store/configureStore";

class Spez extends App {
  async getInitialProps({ Component, ctx }) {
    const { req, store } = ctx;

    // 1. Wait for all page actions to dispatch
    const pageProps = {
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
    };

    // 2. Stop the saga if on server
    if (req) {
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }

    return { pageProps };
  }

  componentDidMount() {
    // Remove the server-side injected CSS. - MaterialUI
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.remove();
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>Spez</title>
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}
export default wrapper.withRedux(Spez);
