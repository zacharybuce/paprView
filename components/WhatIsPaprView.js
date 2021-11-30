import React from "react";
import { Box, Typography, Link } from "@mui/material";

const WhatIsPaprView = () => {
  return (
    <Box
      sx={{
        border: "solid",
        borderWidth: 1,
        p: 3,
        borderRadius: 2,
        borderColor: "lightgrey",
        backgroundColor: "white",
        ml: "3vw",
      }}
    >
      <Typography sx={{ fontSize: 30, mb: "1vh" }}>
        What is paprView?
      </Typography>
      <Typography sx={{ fontSize: 13, fontWeight: "bold", mb: "1vh" }}>
        Search for academic papers, get summaries
      </Typography>
      <Typography sx={{ fontSize: 12 }}>
        paprView allows people to share knowledge with each other by summarizing
        and discussing academic papers. Users increase their 'rank' and gain
        more administrative responsibility among the community by posting
        summaries, comments, questions, or answers about a paper.
      </Typography>
      <Typography sx={{ mt: "1vh" }}>
        <Link href="/help">Learn more here {" > "}</Link>
      </Typography>
    </Box>
  );
};

export default WhatIsPaprView;
