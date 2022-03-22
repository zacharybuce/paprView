import * as React from "react";
import {
  Link,
  Button,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Tooltip,
} from "@mui/material";
import NextLink from "next/link";
import SearchNav from "../components/SearchNav";
import AccountDrawer from "../components/AccountDrawer";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useSession, signIn, signOut } from "next-auth/react";

export default function PrimarySearchAppBar() {
  const { data: session } = useSession();
  const [state, setState] = React.useState(false);

  const logOut = () => {
    signOut();
  };

  return (
    <Box>
      <AppBar color="barback" position="fixed">
        <Toolbar
          sx={{
            pr: [null, null, null, "10vw"],
            pl: [null, null, null],
            justifyContent: "center",
          }}
        >
          <NextLink href="/" passHref>
            <Link style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  backgroundImage: "url(/paprViewBlueInvertNoLine.png)",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  width: "85px",
                  height: "41px",
                  display: { xs: "none", md: "inline-block" },
                }}
              ></Box>
              <Typography
                variant="h4"
                sx={{
                  display: { xs: "none", md: "inline-block" },
                  fontWeight: "500",
                }}
              >
                <Box component="span" sx={{ color: "black" }}>
                  papr
                </Box>
                <Box component="span">View</Box>
              </Typography>
            </Link>
          </NextLink>
          <Tooltip title="Browse by Tag">
            <Link href="/tags" style={{ textDecoration: "none" }}>
              <Button sx={{ ml: "1vw", mr: "1vw" }}>
                <LocalOfferIcon />
              </Button>
            </Link>
          </Tooltip>
          <SearchNav />
          {!session ? (
            <Button
              data-testid="nav-login"
              onClick={() => signIn("google")}
              variant="contained"
            >
              Login
            </Button>
          ) : (
            <Box sx={{ display: "flex" }}>
              <IconButton
                data-testid="nav-profile"
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
