export const imports = {
  'src/Documentation/Login/Login.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-documentation-login-login" */ 'src/Documentation/Login/Login.mdx'),
}
