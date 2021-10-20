import React from "react";
import SummaryEditor from "../components/TestEditor";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import Recommendations from "../components/Recommendations";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function editor() {
  const router = useRouter();
  const [id, setId] = useState("");
  useEffect(() => {
    if (!router.isReady) return;

    setId(router.query.articleId);
  }, [router.isReady]);

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
            <SummaryEditor articleId={id} />
          </Box>
          <Box
            sx={{
              display: { xs: "block", sm: "none" },
            }}
          >
            <SummaryEditor articleId={id} />
          </Box>
        </Grid>
        <Grid item xs={12} xl={4}>
          <Recommendations />
        </Grid>
      </Grid>
    </div>
  );
}
