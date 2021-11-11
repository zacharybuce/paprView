import { Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

const options = {
  convertShortnames: true,
  convertUnicode: true,
  convertAscii: true,
  style: {
    height: 32,
    margin: 4,
  },
};

const Recommendations = () => {
  return (
    <Box
      sx={{
        borderRadius: "5px",
        boxShadow: 3,
        mt: "5vh",
        mb: "2vh",
        ml: "2vw",
        mr: "10vw",
        display: { xs: "none", xl: "block" },
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          display: "block",
          borderRadius: "3px",
        }}
      >
        <Typography variant="h6" sx={{ p: "1rem" }}>
          Tips for writing a summary
        </Typography>
        <Divider />
        <Box
          sx={{
            textAlign: "left",
            pl: 1,
            pr: 3,
            pb: 2,
            listStylePosition: "outside",
            li: {
              mt: 2,
            },
          }}
        >
          <ul>
            <li> Avoid biased comments</li>
            <li>
              Give key points and discuss the major takeaway of the article.
            </li>
            <li>
              Pretend you’re trying to explain the document to a friend who
              isn’t familiar with the subject.
            </li>
            <li>
              Avoid using technical terms when possible and provide a quick
              explanation instead.
            </li>
            <li>Provide helpful links to support claims.</li>
          </ul>
        </Box>
      </Box>
    </Box>
  );
};

export default Recommendations;
