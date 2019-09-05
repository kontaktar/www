import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
// import { AuthContext } from "../utils/auth";
// import styles from 'styles/_config.scss'
// import styles from './assets.scss'

// MUI
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";

export default class Spez extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProperties = {};

    if (Component.getInitialProps) {
      pageProperties = await Component.getInitialProps(ctx);
    }

    return { pageProps: pageProperties };
  }

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
      <Container>
        <Head>
          <title>Spez</title>
        </Head>
        {/* <AuthContext> */}
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component pageContext={this.pageContext} {...pageProps} />
        </ThemeProvider>
        {/* </AuthContext> */}
      </Container>
    );
  }
}
