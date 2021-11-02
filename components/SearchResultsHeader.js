import React from "react";
import { Box, Typography, Grid, Button, Link } from "@mui/material";
import NextLink from "next/link";
import { styled } from "@mui/material/styles";
import SearchRefinement from "./SearchRefinement";

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
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Box sx={{ mb: "2vh" }}>
            <ResultsHeader>Showing results for: "{props.query}"</ResultsHeader>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container justifyContent="flex-end">
            <NextLink href="/articlecform" passHref>
              <Link style={{ textDecoration: "none" }}>
                <Button variant="contained">Add an Article</Button>
              </Link>
            </NextLink>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <ResultsAmount>{props.results} results</ResultsAmount>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mb: "1vh" }}>
          <Grid container justifyContent="flex-end">
            <SearchRefinement />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchResultsHeader;
