import React from "react";
import SummaryEditor from "../components/TestEditor";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import Recommendations from "../components/Recommendations";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoginRedirect from "../components/LoginRedirect";
import { useSession, signIn } from "next-auth/react";
import { styled } from "@mui/material/styles";

const EditorContainer = styled("div")(({ theme }) => ({
  marginTop: "5vh",
  [theme.breakpoints.up("sm")]: {
    marginTop: "5vh",
    marginLeft: "10vw",
    marginBottom: "2vh",
  },
}));

export default function editor() {
  const { data: session } = useSession();
  const router = useRouter();
  const [id, setId] = useState("");
  useEffect(() => {
    if (!router.isReady) return;

    setId(router.query.articleId);
  }, [router.isReady]);

  return (
    <Box sx={{ mt: "10vh", mb: "15vh" }}>
      {session ? (
        <Box>
          <Box sx={{ mt: "1vh", alignItems: "center", textAlign: "center" }}>
            <Typography color="primary" variant="h3">
              Write a Summary
            </Typography>
          </Box>

          <Grid container>
            <Grid item xs={12} xl={8}>
              <EditorContainer>
                <SummaryEditor userId={session.user._id} articleId={id} />
              </EditorContainer>
            </Grid>
            <Grid item xs={12} xl={4}>
              <Recommendations />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <LoginRedirect signIn={signIn} />
      )}
    </Box>
  );
}
