import React from "react";
import { Chip } from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import EngineeringIcon from "@mui/icons-material/Engineering";
import GavelIcon from "@mui/icons-material/Gavel";
import PermDataSettingIcon from "@mui/icons-material/PermDataSetting";
import PublicIcon from "@mui/icons-material/Public";
import BiotechIcon from "@mui/icons-material/Biotech";
import ScienceIcon from "@mui/icons-material/Science";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BlenderIcon from "@mui/icons-material/Blender";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import ComputerIcon from "@mui/icons-material/Computer";
import CalculateIcon from "@mui/icons-material/Calculate";
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BusinessIcon from "@mui/icons-material/Business";
import ParkIcon from "@mui/icons-material/Park";

const setIcon = (tagName) => {
  switch (tagName) {
    case "Psychology":
      return <PsychologyIcon />;
    case "Engineering":
      return <EngineeringIcon />;
    case "Physics":
      return <PermDataSettingIcon />;
    case "Economics":
      return <AttachMoneyIcon />;
    case "Astronomy":
      return <PublicIcon />;
    case "Biology":
      return <BiotechIcon />;
    case "Chemistry":
      return <ScienceIcon />;
    case "Medicine":
      return <LocalPharmacyIcon />;
    case "Health":
      return <FavoriteIcon />;
    case "Nutrition":
      return <BlenderIcon />;
    case "Historical":
      return <HistoryEduIcon />;
    case "Technology":
      return <ComputerIcon />;
    case "Mathematics":
      return <CalculateIcon />;
    case "Social Science":
      return <PeopleIcon />;
    case "Politics":
      return <AccountBalanceIcon />;
    case "Law":
      return <GavelIcon />;
    case "Business":
      return <BusinessIcon />;
    case "Environment":
      return <ParkIcon />;
  }
};

const TagChip = (props) => {
  return (
    <Chip key={props.name} icon={setIcon(props.name)} label={props.name}></Chip>
  );
};

export default TagChip;
