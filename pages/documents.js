import React from "react";
import { useState, useEffect } from "react";
import { Box, CircularProgress, Grid, Divider } from "@mui/material";
import fetch from "isomorphic-unfetch";
import Document from "../components/Document";
import SearchResultsHeader from "../components/SearchResultsHeader";
import { styled } from "@mui/material/styles";

const ResultsContainer = styled("div")(({ theme }) => ({
  marginTop: "10vh",
  marginRight: "10vw",
  marginLeft: "10vw",
  marginBottom: "7vh",
  [theme.breakpoints.up("xl")]: {
    marginRight: "25vw",
    marginLeft: "25vw",
  },
}));

const popularSort = (a, b) => {
  if (a.summaries.length < b.summaries.length) return 1;
  if (a.summaries.length > b.summaries.length) return -1;
  return 0;
};

const documents = (props) => {
  const [popular, setPopular] = useState(false);
  const [filter, setFilter] = useState(null);
  const [relevant, setRelevant] = useState(false);
  const [docs, setDocs] = useState([...props.documents]);

  useEffect(() => {
    setDocs([...props.documents]);
  }, [props.documents]);

  const filterSort = (value) => {
    const date = new Date(value.publishDate).getFullYear();
    const toDate = filter.to ? filter.to : 2021;

    if (filter.from <= date && toDate >= date) {
      for (const tag of value.tags) {
        if (tag in filter) return value;
      }
    }
  };

  if (popular) {
    console.log(popular);
    setDocs([...props.documents].sort(popularSort));
    setPopular(false);
  } else if (relevant) {
    setDocs([...props.documents]);
    setRelevant(false);
  } else if (filter) {
    setDocs(docs.filter(filterSort));
    setFilter(null);
  }

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
        setPopular={setPopular}
        setRelevant={setRelevant}
        setFilter={setFilter}
      />
      <Divider />
      {docs ? (
        docs.map((doc, index) => {
          return (
            <Box key={index}>
              <Document doc={doc} />
            </Box>
          );
        })
      ) : (
        <Box sx={{ mt: "2vh", mr: "10vw", ml: "10vw", textAlign: "center" }}>
          <CircularProgress />
        </Box>
      )}
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
