import React from "react";
import { styled, alpha } from "@mui/material/styles";
import { useState } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Typography, Grid } from "@mui/material";
import { useRouter } from "next/router";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius + 5,
  backgroundColor: alpha(theme.palette.common.white, 1.0),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.75),
  },
  margin: "auto",
  width: "90%",
  [theme.breakpoints.up("sm")]: {
    margin: "auto",
    width: "50%",
  },
  [theme.breakpoints.up("xl")]: {
    margin: "auto",
    width: "40%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: "grey",
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "grey",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    // transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(3),
      width: "100%",
    },
  },
}));

const ButtonContainer = styled("div")(({ theme }) => ({
  margin: "auto",
  paddingTop: "2vh",
  width: "85%",
  [theme.breakpoints.up("sm")]: {
    margin: "auto",
    width: "45%",
  },
  [theme.breakpoints.up("xl")]: {
    margin: "auto",
    width: "35%",
  },
}));

const Search = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(query);

    if (query) {
      router.push({
        pathname: "/documents",
        query: { s: query },
      });
    }
  };

  return (
    <Box onSubmit={handleSubmit} component="form" autoComplete="off" noValidate>
      <SearchContainer>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documents"
          inputProps={{ "aria-label": "search" }}
          sx={{ width: "100%" }}
        />
      </SearchContainer>
      <ButtonContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
            >
              Search
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() =>
                router.push({
                  pathname: "/tags",
                })
              }
              fullWidth
              variant="contained"
              color="primary"
            >
              Browse by Tag
              <LocalOfferIcon sx={{ ml: "5px" }} />
            </Button>
          </Grid>
        </Grid>
      </ButtonContainer>
    </Box>
  );
};

export default Search;
