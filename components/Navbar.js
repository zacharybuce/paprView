import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Link,
  Grid,
  Button,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
import NextLink from "next/link";
import SearchNav from "../components/SearchNav";
import AccountDrawer from "../components/AccountDrawer";
import { useSession, signIn, signOut } from "next-auth/react";

export default function PrimarySearchAppBar() {
  const { data: session } = useSession();
  const [state, setState] = React.useState(false);

  const logOut = () => {
    signOut();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="info" position="fixed">
        <Toolbar>
          <NextLink href="/" passHref>
            <Link style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                paprView
              </Typography>
            </Link>
          </NextLink>

          <Grid container justifyContent="center">
            <Grid item xs={11}>
              <SearchNav />
            </Grid>
          </Grid>
          {!session ? (
            <Button onClick={() => signIn("google")} variant="contained">
              Login
            </Button>
          ) : (
            <div></div>
          )}

          <Box sx={{ flexGrow: 1 }}></Box>

          {session ? (
            <Box sx={{ display: "flex" }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={() => setState(true)}
                color="inherit"
              >
                <Avatar alt={session.user.name} src={session.user.image} />
              </IconButton>
            </Box>
          ) : (
            <div></div>
          )}
        </Toolbar>
      </AppBar>
      <AccountDrawer
        state={state}
        setState={setState}
        logOut={logOut}
        userId={session ? session.user._id : undefined}
      />
    </Box>
  );
}
