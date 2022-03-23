import React from "react";
import { Grid, Typography } from "@mui/material";
import ArticleTagChip from "./ArticleTagChip";
const UserTagDisplay = (props) => {
  return (
    <Grid container sx={{ m: 1 }}>
      <Grid item xs={8}>
        <ArticleTagChip tagId={props.tagId} />
      </Grid>
      <Grid item container alignItems="center" xs={4}>
        <b>{props.score}</b>
        <Typography sx={{ ml: ".5vw" }}>Credibility</Typography>
      </Grid>
    </Grid>
  );
};

export default UserTagDisplay;
