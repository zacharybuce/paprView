import React from "react";
import { styled, alpha } from "@mui/material/styles";
import { useState } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Grid } from "@mui/material";
import { useRouter } from "next/router";

const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1.0),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.75),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  border: "solid",
  borderWidth: "1px",
  borderColor: "darkgrey",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
    marginRight: 0,
  },
}));

const SearchIconWrapper = styled("button")(({ theme }) => ({
  color: "lightgrey",
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  // pointerEvents: "none",
  //display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "grey",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    //transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      //marginLeft: theme.spacing(4),
      width: "100%",
    },
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

  if (router.route == "/") return <div></div>;

  return (
    <Grid container>
      <Grid item xs={12}>
        <SearchContainer>
          <Box
            onSubmit={handleSubmit}
            component="form"
            autoComplete="off"
            noValidate
          >
            <StyledInputBase
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              sx={{ width: "100%" }}
            />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </Box>
        </SearchContainer>
      </Grid>
    </Grid>
  );
};

export default Search;
