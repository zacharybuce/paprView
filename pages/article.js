import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, Grid, Typography } from "@mui/material";
import CreateArticle from "../components/CreateArticle";

export default function article() {
  return (
    <>
      <Box sx={{ mt: "2vh", alignItems: "center", textAlign: "center" }}>
        <Typography variant="h6">
          Type the article title you wish to make a summary for
        </Typography>
      </Box>
      <CreateArticle />
    </>
  );
}
