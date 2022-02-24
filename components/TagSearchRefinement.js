import React from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

const TagSearchRefinement = ({ setOnlyBounties }) => {
  const [alignment, setAlignment] = useState("newest");
  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
    if (newAlignment == "bountied") {
      setOnlyBounties(true);
    } else {
      setOnlyBounties(false);
    }
  };

  return (
    <Box sx={{ mb: "1vh" }}>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="newest">Newest</ToggleButton>
        <ToggleButton value="bountied">Bountied</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default TagSearchRefinement;
