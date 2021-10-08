import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#2D9CC8",
      dark: "#277ea1",
    },
    secondary: {
      main: "#EEB559",
      dark: "#b98d45",
      contrastText: "#fff",
    },
    error: {
      main: red.A400,
    },
    info: {
      main: "#fff",
      contrastText: "#212121",
    },
  },
  typography: {},
});

export default theme;
