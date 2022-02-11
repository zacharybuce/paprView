import React from "react";
import { useState, useEffect } from "react";
import PermDataSettingIcon from "@mui/icons-material/PermDataSetting";
import BiotechIcon from "@mui/icons-material/Biotech";
import ComputerIcon from "@mui/icons-material/Computer";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { Grid, Tooltip } from "@mui/material";

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

const RankIconDisplay = (props) => {
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

  return (
    <Tooltip title={tagName} arrow>
      <Grid item xs={2} sx={{ color: props.color }}>
        {setIcon(disName)}
      </Grid>
    </Tooltip>
  );
};

export default RankIconDisplay;
