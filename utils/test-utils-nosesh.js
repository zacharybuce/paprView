import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/theme";
import "@testing-library/jest-dom";
import CssBaseline from "@mui/material/CssBaseline";
import createEmotionCache from "../src/createEmotionCache";
import { SessionProvider } from "next-auth/react";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const MuiRenderer = ({ children }) => {
  return (
    <SessionProvider session={null}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, {
    wrapper: MuiRenderer,
    ...options,
  });

export * from "@testing-library/react";
export { customRender as renderNoSesh };
