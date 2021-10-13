import React from "react";
import dynamic from "next/dynamic";
import SummaryEditor from "../components/SummaryEditor";
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
        <Grid item xs={12} xl={9}>
          <SummaryEditor />
        </Grid>
        <Grid item xs={12} xl={3}>
          <Recommendations />
        </Grid>
      </Grid>
    </div>
  );
}
