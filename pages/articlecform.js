import { Box, Typography } from "@mui/material";
import { maxWidth } from "@mui/system";
import React from "react";
import ArticleCreateForm from "../components/ArticleCreateForm";

const articlecform = () => {
  return (
    <Box>
      <Typography variant="h5" align="center" sx={{ mt: "2vh" }}>
        Enter Information about the Document
      </Typography>

      <Box sx={{ display: { xs: "inherit", lg: "none" } }}>
        <ArticleCreateForm />
      </Box>
      <Box
        alignContent="center"
        sx={{
          display: { xs: "none", lg: "inherit" },
          ml: "17vw",
          mr: "17vw",
        }}
      >
        <ArticleCreateForm />
      </Box>
    </Box>
  );
};

export default articlecform;
