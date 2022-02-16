import React from "react";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";
const PsychologyIcon = dynamic(() => import("@mui/icons-material/Psychology"));
const PermDataSettingIcon = dynamic(() =>
  import("@mui/icons-material/PermDataSetting")
);
const BiotechIcon = dynamic(() => import("@mui/icons-material/Biotech"));
const ComputerIcon = dynamic(() => import("@mui/icons-material/Computer"));
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

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    process.env.NEXT_PUBLIC_ROOT_URL + "/api/tags/" + props.tagId,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setTagName(data.data.name);
      setDisName(data.data.disciplineName);
    }
  }, [data]);

  // useEffect(() => {
  //   getTagName(props.tagId);
  // }, []);

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
