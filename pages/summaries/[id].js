import React from "react";
import { useState } from "react";
import fetch from "isomorphic-unfetch";
import {
  Box,
  Typography,
  CircularProgress,
  Link,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import Summary from "../../components/Summary";
import ArticleHeading from "../../components/ArticleHeading";
import LoginDialog from "../../components/LoginDialog";
import NextLink from "next/link";
import { useSession, signIn } from "next-auth/react";
import "braft-editor/dist/index.css";

const summaries = ({ summaries, docData }) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  if (!summaries)
    return (
      // <Box
      //   sx={{
      //     mt: "20vh",
      //     mr: "10vw",
      //     ml: "10vw",
      //     mb: "70vh",
      //     textAlign: "center",
      //     pt: "40vh",
      //   }}
      // >
      //   <CircularProgress size={"5rem"} />
      // </Box>
      <Box sx={{ mt: "100vh" }}></Box>
    );
  return (
    <Box sx={{ mt: "8vh" }}>
      <Box sx={{ ml: "10vw", mr: "10vw" }}>
        <ArticleHeading
          title={docData.title}
          authors={docData.authors}
          tags={docData.tags}
        />
      </Box>
      <Box sx={{ ml: "25vw", mr: "25vw" }}>
        {summaries.map((summary, index) => {
          return (
            <Box key={index}>
              <Summary
                content={summary.content}
                lastedit={summary.lastedit}
                userId={summary.user}
              />
              <Divider />
            </Box>
          );
        })}
      </Box>
      <Grid
        container
        alignContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Grid item xs={12} sx={{ mt: "3vh", mb: "3vh" }}>
          {session ? (
            <NextLink href={"/editor?articleId=" + docData._id} passHref>
              <Link style={{ textDecoration: "none" }}>
                <Button variant="contained" color="primary">
                  Submit a Summary
                </Button>
              </Link>
            </NextLink>
          ) : (
            <Button
              onClick={() => setOpen(true)}
              variant="contained"
              color="primary"
            >
              Submit a Summary
            </Button>
          )}
        </Grid>
      </Grid>
      <LoginDialog open={open} setOpen={setOpen} signIn={signIn} />
    </Box>
  );
};

export const getStaticPaths = async () => {
  // const res = await fetch(process.env.ROOT_URL + "/api/articles/");
  // const data = await res.json();

  // const paths = data.data.map((article) => {
  //   return {
  //     params: { id: article._id },
  //   };
  // });

  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { id } = params;
  var summaries = [];

  const articalRes = await fetch(process.env.ROOT_URL + "/api/articles/" + id);
  const { data } = await articalRes.json();

  if (!data) {
    return {
      redirect: {
        destination: "/redirect",
        permenent: false,
      },
    };
  }

  for (const summary of data.summaries) {
    var summaryRes = await fetch(
      process.env.ROOT_URL + "/api/summaries/" + summary
    );
    const summaryData = await summaryRes.json();
    summaries.push(summaryData.data);
  }

  return {
    props: { summaries: summaries, docData: data },
    revalidate: 1,
  };
};

export default summaries;
