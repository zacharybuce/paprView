import React from "react";
import { Box, Typography } from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import PermDataSettingIcon from "@mui/icons-material/PermDataSetting";
import BiotechIcon from "@mui/icons-material/Biotech";
import ComputerIcon from "@mui/icons-material/Computer";

const setIcon = (tagName) => {
  switch (tagName) {
    case "Physical Sciences and Formal Sciences":
      return <PermDataSettingIcon />;
    case "Biomedical and Life Sciences":
      return <BiotechIcon />;
    case "Engineering and Technology":
      return <ComputerIcon />;
    case "Social Sciences and Humanities":
      return <PsychologyIcon />;
  }
};

const DisciplineTagIcon = (props) => {
  if (props.withText) {
    return (
      <Box>
        <Typography data-testid="tag-icon-text">
          {setIcon(props.disciplineName)}
          {" " + props.disciplineName}
        </Typography>
      </Box>
    );
  }

  return (
    <Box data-testid="tag-icon-no-text">{setIcon(props.disciplineName)}</Box>
  );
};

export default DisciplineTagIcon;
