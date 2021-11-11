import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7de6",
      dark: "#2262b5",
    },
    secondary: {
      main: "#EEB559",
      dark: "#b98d45",
      contrastText: "#fff",
    },
    error: {
      main: "#4885ed",
      dark: "#245cbd",
      contrastText: "#fff",
    },
    info: {
      main: "#fff",
      contrastText: "#212121",
    },
    background: { default: "#fcfcfc" },
  },
});

export default theme;
