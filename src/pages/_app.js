import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
// import styles from 'styles/_config.scss'
// import styles from './assets.scss'
export default class Spez extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProperties = {};

    if (Component.getInitialProps) {
      pageProperties = await Component.getInitialProps(ctx);
    }

    return { pageProps: pageProperties };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>Spez</title>
        </Head>
        <Component pageContext={this.pageContext} {...pageProps} />
      </Container>
    );
  }
}
