import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import React from "react";
import FilterDialog from "./FilterDialog";

const SearchRefinement = (props) => {
  const [alignment, setAlignment] = useState("relevant");
  const [open, setOpen] = useState(false);

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }

    switch (newAlignment) {
      case "relevant":
        props.setPopular(false);
        props.setRelevant(true);
        break;
      case "popular":
        props.setPopular(true);
        props.setRelevant(false);
        break;
      case "more":
        props.setPopular(false);
        props.setRelevant(false);
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
      <FilterDialog setFilter={props.setFilter} open={open} setOpen={setOpen} />
    </Box>
  );
};

export default SearchRefinement;
