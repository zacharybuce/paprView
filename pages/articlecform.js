import { Box, Typography } from "@mui/material";
import React from "react";
import ArticleCreateForm from "../components/ArticleCreateForm";
import LoginRedirect from "../components/LoginRedirect";
import { useSession } from "next-auth/react";

const articlecform = () => {
  const { data: session } = useSession();
  return (
    <Box sx={{ mt: "10vh", mb: "55vh" }}>
      {session ? (
        <Box>
          <Typography variant="h5" align="center" sx={{ mt: "2vh" }}>
            Enter Information about the Document
          </Typography>

          <Box sx={{ display: { xs: "inherit", lg: "none" } }}>
            <ArticleCreateForm />
          </Box>
          <Box
            alignContent="center"
            sx={{
              display: { xs: "none", lg: "inherit" },
              ml: "17vw",
              mr: "17vw",
            }}
          >
            <ArticleCreateForm />
          </Box>
        </Box>
      ) : (
        <LoginRedirect />
      )}
    </Box>
  );
};

// export const getServerSideProps = async () => {
//   const res = await fetch(process.env.NEXT_PUBLIC_ROOT_URL + "/api/tags");
//   const { data } = await res.json();

//   console.log(data);

//   return { props: { tags: data } };
// };

export default articlecform;
