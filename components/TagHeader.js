import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const ResultsHeader = styled("div")(({ theme }) => ({
  fontSize: 45,
  [theme.breakpoints.down("lg")]: {
    fontSize: 24,
  },
}));

const TagHeader = () => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Box>
            <ResultsHeader data-testid="Tags Header">Tags</ResultsHeader>
            <Typography data-testid="Tags Descriptor" sx={{ mt: "1vh" }}>
              Tags are a way to group papers that have similar topics and
              subject matter.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TagHeader;
