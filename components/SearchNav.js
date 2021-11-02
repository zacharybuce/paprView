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
  backgroundColor: alpha(theme.palette.primary.main, 1.0),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.75),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: "white",
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
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
    <SearchContainer>
      <Box
        onSubmit={handleSubmit}
        component="form"
        autoComplete="off"
        noValidate
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          sx={{ width: "100%" }}
        />{" "}
      </Box>
    </SearchContainer>
  );
};

export default Search;
