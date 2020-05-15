import React from "react";
import App from "next/app";
import Head from "next/head";

export default class Spez extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
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
        <Component pageContext={this.pageContext} {...pageProps} />
      </>
    );
  }
}
