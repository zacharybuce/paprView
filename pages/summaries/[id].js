import React from "react";
import { useRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import {
  Box,
  Typography,
  CircularProgress,
  Link,
  Button,
  Grid,
} from "@mui/material";
import Summary from "../../components/Summary";

const summaries = ({ summaries, docTitle, docId }) => {
  if (!summaries)
    return (
      <Box sx={{ mt: "2vh", mr: "10vw", ml: "10vw", textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <Box sx={{ mt: "2vh", mr: "10vw", ml: "10vw", textAlign: "center" }}>
        <Typography variant="h5">{docTitle}</Typography>
      </Box>
      <Box>
        {summaries.map((summary) => {
          return (
            <Summary content={summary.content} lastedit={summary.lastedit} />
          );
        })}
      </Box>
      <Grid container alignContent="center" alignItems="center" textAlign="center">
        <Grid item xs={12}>
          <Link
            href={"/editor?articleId=" + docId}
            passHref
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" color="primary">
              Submit a Summary
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch(process.env.ROOT_URL + "/api/articles/");
  const data = await res.json();

  const paths = data.data.map((article) => {
    return {
      params: { id: article._id },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
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
    props: { summaries: summaries, docTitle: data.title, docId: data._id },
    revalidate: 1,
  };
};

export default summaries;
