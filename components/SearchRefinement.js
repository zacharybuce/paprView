import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import React from "react";
import FilterDialog from "./FilterDialog";

const SearchRefinement = (props) => {
  const [alignment, setAlignment] = useState("relevant");
  const [open, setOpen] = useState(false);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);

    switch (newAlignment) {
      case "relevant":
        break;
      case "popular":
        break;
      case "more":
        setOpen(true);
        break;
    }
  };

  return (
    <Box>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="relevant">Relevant</ToggleButton>
        <ToggleButton value="popular">Popular</ToggleButton>
        <ToggleButton value="more">
          More <FilterListIcon sx={{ ml: "3px" }} />
        </ToggleButton>
      </ToggleButtonGroup>
      <FilterDialog open={open} setOpen={setOpen} />
    </Box>
  );
};

export default SearchRefinement;
