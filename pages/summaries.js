import React from "react";
import { useRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import { Box, Typography } from "@mui/material";

const summaries = ({ summaries }) => {
  return (
    <Box>
      {summaries.map((summary) => {
        <Typography>{summary}</Typography>;
      })}
    </Box>
  );
};

export const getStaticProps = async (context) => {
  const res = await fetch(process.env.ROOT_URL + "/api/summaries");
  const { data } = await res.json();
  return { props: { summaries: data } };
};

export default summaries;
