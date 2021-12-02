import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import React from "react";
import dynamic from "next/dynamic";

const DynamicFilterDialog = dynamic(() => import("./FilterDialog"));

const SearchRefinement = (props) => {
  const [alignment, setAlignment] = useState("relevant");
  const [open, setOpen] = useState(false);

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }

    if (newAlignment === null && alignment == "more") newAlignment = "more";

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
      <DynamicFilterDialog
        setFilter={props.setFilter}
        open={open}
        setOpen={setOpen}
      />
    </Box>
  );
};

export default SearchRefinement;
