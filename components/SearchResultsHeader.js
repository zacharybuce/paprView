import React from "react";
import { Box, Typography, Grid } from "@mui/material";
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
      <Box sx={{ mb: "2vh" }}>
        <ResultsHeader>Showing results for: "{props.query}"</ResultsHeader>
      </Box>
      <Grid container>
        <Grid item xs={6}>
          <ResultsAmount>{props.results} results</ResultsAmount>
        </Grid>
        <Grid item xs={6} sx={{ mb: "1vh" }}>
          <Grid container justifyContent="flex-end">
            <SearchRefinement />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchResultsHeader;
