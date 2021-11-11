import React from "react";
import { Grid, Typography, Button, Box, Divider, Link } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { styled } from "@mui/material/styles";
import NextLink from "next/link";

const ResultsContainer = styled("div")(({ theme }) => ({
  marginTop: "30vh",
  marginRight: "15vw",
  marginLeft: "15vw",
  marginBottom: "39vh",
  [theme.breakpoints.up("xl")]: {
    marginRight: "30vw",
    marginLeft: "30vw",
  },
  [theme.breakpoints.down("sm")]: {
    marginRight: "10vw",
    marginLeft: "10vw",
  },
}));

const LoginRedirect = (props) => {
  return (
    <ResultsContainer
      sx={{
        border: "solid",
        borderWidth: 1,
        p: 5,
        borderRadius: 5,
        borderColor: "lightgrey",
      }}
    >
      <Grid container>
        <Grid item xs={12} sx={{ mb: "2vh" }}>
          <Typography color="primary" variant="h5" sx={{ fontSize: 29 }}>
            Login to get the most out of paprView
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mb: "2vh" }}>
          <Typography>
            Share your knowledge by creating summaries, casting votes, and
            participating in community discussion.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sx={{ mr: "1vh", ml: "1vh" }}>
          <Button
            fullWidth
            variant="contained"
            color="error"
            sx={{ mt: "2vh" }}
            onClick={() => props.signIn("google")}
          >
            <GoogleIcon sx={{ mr: "2vw" }} />
            Continue with Google
          </Button>
        </Grid>
        <Grid
          textAlign="center"
          item
          xs={12}
          sx={{ mt: "2vh", mr: "1vh", ml: "1vh" }}
        >
          <Typography variant="caption">
            By continuing, you are setting up a paprView account and agree to
            our
          </Typography>{" "}
          <NextLink href="/privacy" passHref>
            <Link>
              <Typography variant="caption">Privacy Policy</Typography>
            </Link>
          </NextLink>
        </Grid>
      </Grid>
    </ResultsContainer>
  );
};

export default LoginRedirect;