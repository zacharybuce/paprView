import React from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import TagChip from "../components/TagChip";

const printAuthors = (authors) => {
  var returnStr = "";

  for (const author of authors) {
    returnStr += author + ", ";
  }

  returnStr = returnStr.substring(0, returnStr.length - 1);

  return returnStr;
};

const ArticleHeading = (props) => {
  return (
    <Grid container sx={{ mt: "2vh", textAlign: "center" }} spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h5">{props.title}</Typography>
      </Grid>
      <Grid item xs={12}>
        {printAuthors(props.authors)}
      </Grid>
      <Grid item xs={12}>
        {props.tags.map((tag) => {
          return <TagChip name={tag} />;
        })}
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  );
};

export default ArticleHeading;
