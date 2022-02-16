import { Box, Typography } from "@mui/material";
import React from "react";
import ArticleCreateForm from "../components/ArticleCreateForm";
import LoginRedirect from "../components/LoginRedirect";
import { useSession } from "next-auth/react";
import { styled } from "@mui/material/styles";

const FormContainer = styled("div")(({ theme }) => ({
  marginTop: "5vh",
  marginRight: "10vw",
  marginLeft: "10vw",
  marginBottom: "7vh",
  [theme.breakpoints.up("xl")]: {
    marginRight: "18vw",
    marginLeft: "18vw",
  },
  [theme.breakpoints.down("sm")]: {
    marginRight: "0vw",
    marginLeft: "0vw",
  },
}));

const articlecform = () => {
  const { data: session } = useSession();
  return (
    <Box sx={{ mt: "20vh" }}>
      {session ? (
        <Box>
          <Typography
            variant="h5"
            align="center"
            sx={{ mt: "2vh", pr: "1vw", pl: "1vw" }}
          >
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
