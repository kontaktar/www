import viewports from "./viewports.js";

export const parameters = {
  viewport: {
    viewports: viewports,
    defaultViewport: "desktop"
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
