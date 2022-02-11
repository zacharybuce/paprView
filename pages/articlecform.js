import { Box, Typography } from "@mui/material";
import React from "react";
import ArticleCreateForm from "../components/ArticleCreateForm";
import LoginRedirect from "../components/LoginRedirect";
import { useSession } from "next-auth/react";
import { styled } from "@mui/material/styles";

const FormContainer = styled("div")(({ theme }) => ({
  marginTop: "10vh",
  marginRight: "10vw",
  marginLeft: "10vw",
  marginBottom: "7vh",
  [theme.breakpoints.up("xl")]: {
    marginRight: "18vw",
    marginLeft: "18vw",
  },
}));

const articlecform = () => {
  const { data: session } = useSession();
  return (
    <Box sx={{ mt: "10vh", mb: "55vh" }}>
      {session ? (
        <Box>
          <Typography variant="h5" align="center" sx={{ mt: "2vh" }}>
            Enter Information about the Document
          </Typography>
          <FormContainer>
            <Box alignContent="center">
              <ArticleCreateForm />
            </Box>
          </FormContainer>
        </Box>
      ) : (
        <LoginRedirect />
      )}
    </Box>
  );
};

export default articlecform;
