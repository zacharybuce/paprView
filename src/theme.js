import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7de6",
      dark: "#2262b5",
      contrastText: "#fafafa",
    },
    secondary: {
      main: "#EEB559",
      dark: "#b98d45",
      contrastText: "#fff",
    },
    info: {
      main: "#fff",
      contrastText: "#212121",
    },
    google: {
      main: "#4885ed",
      dark: "#245cbd",
      contrastText: "#fff",
    },
    barback: {
      main: "#f7f7f7",
      dark: "#245cbd",
      contrastText: "#fff",
    },
    background: { default: "#fcfcfc" },
  },
});

export default theme;
