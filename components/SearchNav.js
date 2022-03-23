import React from "react";
import { styled, alpha } from "@mui/material/styles";
import { useState } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import { useRouter } from "next/router";

const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1.0),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.75),
  },
  marginLeft: 0,
  border: "solid",
  borderWidth: "1px",
  borderColor: "darkgrey",
  [theme.breakpoints.up("xs")]: {
    width: "70%",
    //marginRight: "20vw",
  },
  [theme.breakpoints.up("sm")]: {
    width: "40%",
    marginRight: "7vw",
  },
  [theme.breakpoints.up("md")]: {
    width: "50%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "50%",
  },
  [theme.breakpoints.up("xl")]: {
    width: "50%",
  },
}));
const BlankContainer = styled("div")(({ theme }) => ({
  position: "relative",
  [theme.breakpoints.up("xs")]: {
    width: "50%",
    marginRight: "20vw",
  },
  [theme.breakpoints.up("sm")]: {
    width: "40%",
    marginRight: "10vw",
  },
  [theme.breakpoints.up("md")]: {
    width: "50%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "50%",
  },
  [theme.breakpoints.up("xl")]: {
    width: "50%",
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
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
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
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
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

  if (router && router.route == "/") return <BlankContainer></BlankContainer>;

  return (
    <SearchContainer>
      <Box
        onSubmit={handleSubmit}
        component="form"
        autoComplete="off"
        noValidate
      >
        <StyledInputBase
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a paper"
          inputProps={{ "aria-label": "search" }}
          sx={{ width: "100%" }}
        />
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
      </Box>
    </SearchContainer>
  );
};

export default Search;
