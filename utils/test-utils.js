import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/theme";
import "@testing-library/jest-dom";
import CssBaseline from "@mui/material/CssBaseline";
import createEmotionCache from "../src/createEmotionCache";
import { SessionProvider } from "next-auth/react";

// const {
//     Component,
//     emotionCache = clientSideEmotionCache,
//     pageProps,
//     session,
// } = props;

const session = {
  user: {
    comments: [],
    bookmarks: [],
    achievements: [],
    _id: "6226550fc8e9d97899b85ac2",
    name: "Zachary Buce",
    email: "123@gmail.com",
    image:
      "https://lh3.googleusercontent.com/a/AATXAJzw2d3-F4l0wTj9ZJFYFh9xiXAcCODRM2U-DbW0=s96-c",
    emailVerified: null,
    votes: [
      {
        summaryId: "62272698fc527d986d78ec5f",
        upvote: true,
        downvote: false,
        _id: "62399b406f139e33a69eed83",
      },
      {
        summaryId: "622b30a00274493e22070e85",
        upvote: true,
        downvote: false,
        _id: "623760e7b4945fa402bc93d3",
      },
    ],
    joinDate: "2022-03-07T18:55:12.000Z",
    points: 750,
    summaries: [],
    ranks: [
      {
        tag: "62265736b17d6e6a6e4fe57c",
        value: 0,
        _id: "62265765b17d6e6a6e4fe58d",
      },
    ],
  },
};

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const MuiRenderer = ({ children }) => {
  return (
    <SessionProvider session={session}>
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
export { customRender as render };
