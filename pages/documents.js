import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  Divider,
  Typography,
  Link,
} from "@mui/material";
import Document from "../components/Document";
import SearchResultsHeader from "../components/SearchResultsHeader";
import { styled } from "@mui/material/styles";
import WhatIsPaprView from "../components/WhatIsPaprView";
import { getDocs } from "./api/search/[id]";
import TopUsers from "../components/TopUsers";

const Title = styled("div")(({ theme }) => ({
  fontSize: 20,
  "&:hover": {
    color: theme.palette.primary.light,
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: 16,
  },
}));

const ResultsContainer = styled("div")(({ theme }) => ({
  //marginRight: "10vw",
  //marginLeft: "10vw",
  marginBottom: "7vh",
  [theme.breakpoints.up("xs")]: {
    marginTop: "10vh",
    marginRight: "3vw",
    marginLeft: "3vw",
  },
  [theme.breakpoints.up("sm")]: {
    marginRight: "10vw",
    marginLeft: "10vw",
  },
  [theme.breakpoints.up("md")]: { marginTop: "12vh" },
  [theme.breakpoints.up("lg")]: {
    marginTop: "15vh",
    marginRight: "15vw",
    marginLeft: "22vw",
  },
  [theme.breakpoints.up("xl")]: {
    marginTop: "10vh",
    marginRight: "15vw",
    marginLeft: "22vw",
  },
}));

const WhatIsContainer = styled("div")(({ theme }) => ({
  marginBottom: "2vh",
  [theme.breakpoints.down("sm")]: {
    marginTop: "4vh",
    paddingRight: "3vw",
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
        <Grid item xs={12} md={8}>
          <SearchResultsHeader
            query={props.query}
            results={props.documents.length}
            setPopular={setPopular}
            setRelevant={setRelevant}
            setFilter={setFilter}
          />
          <Divider />
          <Box
            sx={{
              mt: "1vh",
              mb: "1vh",
              border: "solid",
              borderRadius: 2,
              p: 1,
              borderColor: "#EEB559",
              borderWidth: "1px",
            }}
          >
            <Link href="/summaries/6226465de38271a36b534b9b">
              <Title>paprView Beta Community Page</Title>
            </Link>
          </Box>
          {docs.length ? (
            docs.map((doc, index) => {
              return <Document key={index} doc={doc} />;
            })
          ) : (
            <Box sx={{ mt: "2vh", textAlign: "center" }}>
              <Typography variant="h4" sx={{ mb: "3vh" }}>
                We can't find what you are looking for...
              </Typography>
              <Typography variant="h6">
                Search for something else or be the first to contribute!
              </Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <WhatIsContainer>
            <WhatIsPaprView />
          </WhatIsContainer>

          <WhatIsContainer>
            <TopUsers />
          </WhatIsContainer>
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
