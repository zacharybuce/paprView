import { Box, Typography } from "@mui/material";
import { maxWidth } from "@mui/system";
import React from "react";
import ArticleCreateForm from "../components/ArticleCreateForm";
import fetch from "isomorphic-unfetch";
import DocumentFormGuide from "../components/DocumentFormGuide";
import Test from "../components/Test";

const articlecform = ({ tags }) => {
  return (
    <Box sx={{ mt: "10vh" }}>
      <Typography variant="h5" align="center" sx={{ mt: "2vh" }}>
        Enter Information about the Document
      </Typography>

      <Box sx={{ display: { xs: "inherit", lg: "none" } }}>
        <ArticleCreateForm tags={tags} />
      </Box>
      <Box
        alignContent="center"
        sx={{
          display: { xs: "none", lg: "inherit" },
          ml: "17vw",
          mr: "17vw",
        }}
      >
        <ArticleCreateForm tags={tags} />
      </Box>
    </Box>
  );
};

export const getStaticProps = async (context) => {
  const res = await fetch(process.env.ROOT_URL + "/api/tags");
  const { data } = await res.json();
  return { props: { tags: data } };
};

export default articlecform;
