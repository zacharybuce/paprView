import * as React from "react";
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
      <AppBar color="barback" position="fixed">
        <Toolbar>
          <NextLink href="/" passHref>
            <Link style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  backgroundImage: "url(/paprViewBlueInvertNoLine.png)",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  width: "85px",
                  height: "41px",
                  display: { xs: "none", sm: "block" },
                }}
              >
                <Box sx={{ position: "relative", left: "100%" }}>
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{
                      display: { xs: "none", sm: "block" },
                      fontWeight: "500",
                    }}
                  >
                    <Box component="span" sx={{ color: "black" }}>
                      papr
                    </Box>
                    <Box component="span">View</Box>
                  </Typography>
                </Box>
              </Box>
            </Link>
          </NextLink>

          <Grid container justifyContent="center">
            <Grid item xs={7} md={5}>
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
