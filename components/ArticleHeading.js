import React from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import AritcleTagChip from "./ArticleTagChip";
import { styled } from "@mui/material/styles";

const ResultsHeader = styled("div")(({ theme }) => ({
  fontSize: 24,
  [theme.breakpoints.up("sm")]: {
    fontSize: 35,
  },
}));

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
        <ResultsHeader>{props.title}</ResultsHeader>
      </Grid>
      <Grid item xs={12}>
        {printAuthors(props.authors)}
      </Grid>
      <Grid item xs={12}>
        {props.tags.map((tag, index) => {
          return <AritcleTagChip key={index} tagId={tag} />;
        })}
      </Grid>
    </Grid>
  );
};

export default ArticleHeading;
