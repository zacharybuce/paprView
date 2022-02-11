import React from "react";
import { Box, Typography } from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import GavelIcon from "@mui/icons-material/Gavel";
import PermDataSettingIcon from "@mui/icons-material/PermDataSetting";
import PublicIcon from "@mui/icons-material/Public";
import BiotechIcon from "@mui/icons-material/Biotech";
import ScienceIcon from "@mui/icons-material/Science";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import ComputerIcon from "@mui/icons-material/Computer";
import CalculateIcon from "@mui/icons-material/Calculate";
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BusinessIcon from "@mui/icons-material/Business";
import ParkIcon from "@mui/icons-material/Park";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import BrushIcon from "@mui/icons-material/Brush";
import LanguageIcon from "@mui/icons-material/Language";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";

const setIcon = (tagName) => {
  switch (tagName) {
    case "Physical Sciences and Mathematics":
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
        <Typography>
          {setIcon(props.disciplineName)}
          {" " + props.disciplineName}
        </Typography>
      </Box>
    );
  }

  return <Box>{setIcon(props.disciplineName)}</Box>;
};

export default DisciplineTagIcon;
