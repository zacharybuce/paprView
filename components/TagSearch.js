import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Autocomplete, TextField } from "@mui/material";

const SearchContainer = styled("div")(({ theme }) => ({
  marginBottom: "1vh",
  [theme.breakpoints.up("sm")]: {},
  [theme.breakpoints.down("sm")]: {},
}));

const SearchIconWrapper = styled("button")(({ theme }) => ({
  color: "lightgrey",
  padding: theme.spacing(0, 2),
  height: "56px",
  position: "relative",
  top: "22px",
  // pointerEvents: "none",
  alignItems: "center",
  justifyContent: "center",
}));

const TagSearch = ({ handleSubmit, tags }) => {
  const [queryTag, setQueryTag] = useState();

  return (
    <SearchContainer>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={tags}
        onChange={(event, newValue) => {
          setQueryTag(newValue);
        }}
        getOptionLabel={(tag) => tag.name}
        renderInput={(params) => (
          <TextField {...params} label="Search by Tag" />
        )}
        sx={{ display: "inline-block", width: "60%", height: "100%" }}
      />
      <SearchIconWrapper onClick={() => handleSubmit(queryTag)}>
        <SearchIcon />
      </SearchIconWrapper>
    </SearchContainer>
  );
};

export default TagSearch;
