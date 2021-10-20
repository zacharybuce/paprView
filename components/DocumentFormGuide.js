import React from "react";
import { Box, Typography } from "@mui/material";

const DocumentFormGuide = () => {
  return (
    <Box
      sx={{
        mt: "2vh",
        mr: "10vw",
        ml: "10vw",
        borderRadius: "5px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "gray",
          textAlign: "center",
          display: "block",
          borderRadius: "5px",
        }}
      >
        <Typography variant="h6" color="white" sx={{ p: "1rem" }}>
          Guide for Article Form
        </Typography>
      </Box>
    </Box>
  );
};

export default DocumentFormGuide;
