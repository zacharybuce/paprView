import React from "react";
import { Box, Grid, Button, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { styled } from "@mui/material/styles";
import SearchRefinement from "./SearchRefinement";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import LoginDialog from "./LoginDialog";

const ResultsHeader = styled("div")(({ theme }) => ({
  fontSize: 45,
  [theme.breakpoints.down("lg")]: {
    fontSize: 24,
  },
}));

const ResultsAmount = styled("div")(({ theme }) => ({
  fontSize: 25,
  [theme.breakpoints.down("lg")]: {
    fontSize: 20,
  },
}));

const TagHeader = ({ tag }) => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{}}>
            <ResultsHeader>Tags</ResultsHeader>
            <Typography sx={{ mt: "1vh" }}>
              Tags are a way to group papers that have similar topics and
              subject matter.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}></Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={6} sx={{ mb: "1vh", mt: "1vh" }}>
          <Grid container justifyContent="flex-end"></Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TagHeader;
