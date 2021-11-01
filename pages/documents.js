import React from "react";
import { Box, CircularProgress, Grid, Divider } from "@mui/material";
import fetch from "isomorphic-unfetch";
import Document from "../components/Document";
import SearchResultsHeader from "../components/SearchResultsHeader";
import SearchRefinement from "../components/SearchRefinement";
import { styled } from "@mui/material/styles";

const ResultsContainer = styled("div")(({ theme }) => ({
  marginTop: "10vh",
  marginRight: "10vw",
  marginLeft: "10vw",

  [theme.breakpoints.up("xl")]: {
    marginRight: "25vw",
    marginLeft: "25vw",
  },
}));

const documents = (props) => {
  if (!documents)
    return (
      <Box sx={{ mt: "2vh", mr: "10vw", ml: "10vw", textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <ResultsContainer>
      <SearchResultsHeader
        query={props.query}
        results={props.documents.length}
      />
      <Divider />
      {props.documents.map((doc, index) => {
        return (
          <Box key={index}>
            <Document doc={doc} />
          </Box>
        );
      })}
    </ResultsContainer>
  );
};

export default documents;

export async function getServerSideProps(context) {
  try {
    const res = await fetch(
      process.env.ROOT_URL + "/api/search/" + context.query.s,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    const documents = data.data;

    return {
      props: { documents: documents, query: context.query.s },
    };
  } catch (error) {
    console.log(error);
  }
}
