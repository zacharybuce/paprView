import React from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import AritcleTagChip from "./ArticleTagChip";

const printAuthors = (authors) => {
  var returnStr = "";

  for (const author of authors) {
    returnStr += author + ", ";
  }

  returnStr = returnStr.substring(0, returnStr.length - 2);

  return returnStr;
};

const ArticleHeading = (props) => {
  return (
    <Grid container sx={{ mt: "2vh", textAlign: "center" }} spacing={1}>
      <Grid item xs={12} sx={{ mr: "2vw", ml: "2vw" }}>
        <Typography variant="h4">{props.title}</Typography>
      </Grid>
      <Grid item xs={12}>
        {printAuthors(props.authors)}
      </Grid>
      <Grid item xs={12}>
        {props.tags.map((tag, index) => {
          return <AritcleTagChip key={index} tagId={tag} />;
        })}
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ backgroundColor: "#808080" }} />
      </Grid>
    </Grid>
  );
};

export default ArticleHeading;
