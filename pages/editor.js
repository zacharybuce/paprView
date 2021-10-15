import React from "react";
import dynamic from "next/dynamic";
import SummaryEditor from "../components/TestEditor";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import Recommendations from "../components/Recommendations";

export default function editor() {
  return (
    <div>
      <Box sx={{ mt: "1vh", alignItems: "center", textAlign: "center" }}>
        <Typography color="primary" variant="h3">
          Write a Summary
        </Typography>
      </Box>

      <Grid container>
        <Grid item xs={12} xl={8}>
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              mt: "5vh",
              ml: "10vw",
              mb: "2vh",
            }}
          >
            <SummaryEditor />
          </Box>
          <Box
            sx={{
              display: { xs: "block", sm: "none" },
            }}
          >
            <SummaryEditor />
          </Box>
        </Grid>
        <Grid item xs={12} xl={4}>
          <Recommendations />
        </Grid>
      </Grid>
    </div>
  );
}
