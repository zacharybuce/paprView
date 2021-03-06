import React from "react";
import { Chip, Grid, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import dynamic from "next/dynamic";
import useSWR from "swr";
const PsychologyIcon = dynamic(() => import("@mui/icons-material/Psychology"));
const PermDataSettingIcon = dynamic(() =>
  import("@mui/icons-material/PermDataSetting")
);
const BiotechIcon = dynamic(() => import("@mui/icons-material/Biotech"));
const ComputerIcon = dynamic(() => import("@mui/icons-material/Computer"));

const setIcon = (tagName) => {
  switch (tagName) {
    case "Physical and Formal Sciences":
      return <PermDataSettingIcon />;
    case "Biomedical and Life Sciences":
      return <BiotechIcon />;
    case "Engineering and Technology":
      return <ComputerIcon />;
    case "Social Sciences and Humanities":
      return <PsychologyIcon />;
  }
};

const Tag = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "11",
  },
}));

const UserTagDisplay = (props) => {
  const [tagName, setTagName] = useState(null);
  const [disName, setDisName] = useState(null);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    process.env.NEXT_PUBLIC_ROOT_URL + "/api/tags/" + props.tagId,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (data) {
      setTagName(data.data.name);
      setDisName(data.data.disciplineName);
    }
  }, [data]);

  if (props.rank)
    return (
      <Tooltip title={tagName + " " + props.rankValue} arrow>
        <Grid
          data-testid="render-user-chip"
          item
          xs={2}
          sx={{ color: props.color }}
        >
          {setIcon(disName)}
        </Grid>
      </Tooltip>
    );

  return (
    <Chip
      data-testid="render-paper-chip"
      size="small"
      key={tagName}
      icon={setIcon(disName)}
      label={tagName}
    ></Chip>
  );
};

export default UserTagDisplay;
