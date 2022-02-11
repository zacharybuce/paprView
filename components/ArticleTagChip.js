import React from "react";
import { Chip } from "@mui/material";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const PsychologyIcon = dynamic(() => import("@mui/icons-material/Psychology"));
const GavelIcon = dynamic(() => import("@mui/icons-material/Gavel"));
const PermDataSettingIcon = dynamic(() =>
  import("@mui/icons-material/PermDataSetting")
);
const PublicIcon = dynamic(() => import("@mui/icons-material/Public"));
const BiotechIcon = dynamic(() => import("@mui/icons-material/Biotech"));
const ScienceIcon = dynamic(() => import("@mui/icons-material/Science"));
const LocalPharmacyIcon = dynamic(() =>
  import("@mui/icons-material/LocalPharmacy")
);
const AttachMoneyIcon = dynamic(() =>
  import("@mui/icons-material/AttachMoney")
);
const HistoryEduIcon = dynamic(() => import("@mui/icons-material/HistoryEdu"));
const ComputerIcon = dynamic(() => import("@mui/icons-material/Computer"));
const CalculateIcon = dynamic(() => import("@mui/icons-material/Calculate"));
const PeopleIcon = dynamic(() => import("@mui/icons-material/People"));
const AccountBalanceIcon = dynamic(() =>
  import("@mui/icons-material/AccountBalance")
);
const BusinessIcon = dynamic(() => import("@mui/icons-material/Business"));
const ParkIcon = dynamic(() => import("@mui/icons-material/Park"));
const SelfImprovementIcon = dynamic(() =>
  import("@mui/icons-material/SelfImprovement")
);
const BrushIcon = dynamic(() => import("@mui/icons-material/Brush"));
const LanguageIcon = dynamic(() => import("@mui/icons-material/Language"));
const LiveHelpIcon = dynamic(() => import("@mui/icons-material/LiveHelp"));

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
      setTagName(tagData.data.name);
      setDisName(tagData.data.disciplineName);
    } catch (error) {
      console.log(error);
    }
  };

  return <Chip key={tagName} icon={setIcon(disName)} label={tagName}></Chip>;
};

export default UserTagDisplay;
