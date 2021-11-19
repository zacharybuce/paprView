import React from "react";
import { Chip } from "@mui/material";
import { useState, useEffect } from "react";
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
    case "Law":
      return <GavelIcon />;
    case "Psychology":
      return <PsychologyIcon />;
    case "Economics":
      return <AttachMoneyIcon />;
    case "Sociology":
      return <PeopleIcon />;
    case "Political Science":
      return <AccountBalanceIcon />;
    case "Physics":
      return <PermDataSettingIcon />;
    case "Chemistry":
      return <ScienceIcon />;
    case "Biology":
      return <BiotechIcon />;
    case "Computer Science and Engineering":
      return <ComputerIcon />;
    case "Mathematics":
      return <CalculateIcon />;
    case "Environment and Earth Science":
      return <ParkIcon />;
    case "Astronomy":
      return <PublicIcon />;
    case "History":
      return <HistoryEduIcon />;
    case "Religion":
      return <SelfImprovementIcon />;
    case "Arts":
      return <BrushIcon />;
    case "Philosophy":
      return <LiveHelpIcon />;
    case "Linguistics":
      return <LanguageIcon />;
    case "Business":
      return <BusinessIcon />;
    case "Medicine":
      return <LocalPharmacyIcon />;
  }
};

const UserTagDisplay = (props) => {
  const [tagName, setTagName] = useState(null);
  const [disName, setDisName] = useState(null);

  useEffect(() => {
    getTagName(props.tagId);
  }, [props]);
  const getTagName = async (tagId) => {
    try {
      var tagRes = await fetch(
        process.env.NEXT_PUBLIC_ROOT_URL + "/api/tags/" + tagId
      );
      const tagData = await tagRes.json();
      console.log(tagData);
      setTagName(tagData.data.name);
      setDisName(tagData.data.disciplineName);
    } catch (error) {
      console.log(error);
    }
  };

  return <Chip key={tagName} icon={setIcon(disName)} label={tagName}></Chip>;
};

export default UserTagDisplay;
