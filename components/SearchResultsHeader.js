import React from "react";
import { Box, Typography, Grid, Button, Link } from "@mui/material";
import NextLink from "next/link";
import { styled } from "@mui/material/styles";
import SearchRefinement from "./SearchRefinement";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import LoginDialog from "./LoginDialog";

const ResultsHeader = styled("Typography")(({ theme }) => ({
  fontSize: 30,
  [theme.breakpoints.down("lg")]: {
    fontSize: 24,
  },
}));

const ResultsAmount = styled("Typography")(({ theme }) => ({
  fontSize: 25,
  [theme.breakpoints.down("lg")]: {
    fontSize: 20,
  },
}));

const SearchResultsHeader = (props) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Box sx={{ mb: "2vh" }}>
            <ResultsHeader>Showing results for "{props.query}"</ResultsHeader>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container justifyContent="flex-end">
            {session ? (
              <NextLink href="/articlecform" passHref>
                <Link style={{ textDecoration: "none" }}>
                  <Button color="secondary" variant="contained">
                    Add an Article
                  </Button>
                </Link>
              </NextLink>
            ) : (
              <Button
                onClick={() => setOpen(true)}
                color="secondary"
                variant="contained"
              >
                Add an Article
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <ResultsAmount>{props.results} results</ResultsAmount>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mb: "1vh" }}>
          <Grid container justifyContent="flex-end">
            <SearchRefinement
              setPopular={props.setPopular}
              setRelevant={props.setRelevant}
              setFilter={props.setFilter}
            />
          </Grid>
        </Grid>
      </Grid>
      <LoginDialog open={open} setOpen={setOpen} signIn={signIn} />
    </Box>
  );
};

export default SearchResultsHeader;
