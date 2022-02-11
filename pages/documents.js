import React from "react";
import { useState, useEffect } from "react";
import { Box, CircularProgress, Grid, Divider } from "@mui/material";
import Document from "../components/Document";
import SearchResultsHeader from "../components/SearchResultsHeader";
import { styled } from "@mui/material/styles";
import WhatIsPaprView from "../components/WhatIsPaprView";
import { getDocs } from "./api/search/[id]";

const ResultsContainer = styled("div")(({ theme }) => ({
  marginTop: "10vh",
  //marginRight: "10vw",
  //marginLeft: "10vw",
  marginBottom: "7vh",
  [theme.breakpoints.up("xl")]: {
    marginRight: "15vw",
    marginLeft: "22vw",
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
    const toDate = filter.to ? filter.to : 2022;
    const fromDate = filter.from ? filter.from : 0;
    console.log(value.tags);
    if (fromDate <= date && toDate >= date) {
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
    setDocs([...props.documents].filter(filterSort));
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
      <Grid container>
        <Grid item xs={8}>
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
            <Box
              sx={{ mt: "2vh", mr: "10vw", ml: "10vw", textAlign: "center" }}
            >
              <CircularProgress />
            </Box>
          )}
        </Grid>
        <Grid item xs={4}>
          <WhatIsPaprView />
        </Grid>
      </Grid>
    </ResultsContainer>
  );
};

export default documents;

export async function getServerSideProps(context) {
  try {
    const { res } = context;

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=79"
    );

    // const res = await fetch(
    //   process.env.NEXT_PUBLIC_ROOT_URL + "/api/search/" + context.query.s,
    //   {
    //     method: "GET",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // const data = await res.json()
    const documents = await getDocs(context.query.s);
    return {
      props: {
        documents: JSON.parse(JSON.stringify(documents)),
        query: context.query.s,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
