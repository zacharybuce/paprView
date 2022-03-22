import React from "react";
import { useState, useEffect } from "react";
import { Box, CircularProgress, Grid, Divider } from "@mui/material";
import Document from "../components/Document";
import TagHeader from "../components/TagHeader";
import { styled } from "@mui/material/styles";
import WhatIsPaprView from "../components/WhatIsPaprView";
import TopUsers from "../components/TopUsers";
import TagSearch from "../components/TagSearch";
import TagSearchRefinement from "../components/TagSearchRefinement";

const ResultsContainer = styled("div")(({ theme }) => ({
  marginTop: "10vh",
  //marginRight: "10vw",
  //marginLeft: "10vw",
  marginBottom: "7vh",
  [theme.breakpoints.up("xl")]: {
    marginRight: "15vw",
    marginLeft: "22vw",
  },
  [theme.breakpoints.down("sm")]: {
    marginRight: "3vw",
    marginLeft: "3vw",
  },
}));

const WhatIsContainer = styled("div")(({ theme }) => ({
  marginBottom: "2vh",
  [theme.breakpoints.down("sm")]: {
    marginTop: "4vh",
    paddingRight: "3vw",
  },
}));

const tags = ({ tags }) => {
  const [docs, setDocs] = useState([]);
  const [docsToShow, setDocsToShow] = useState([]);
  const [onlyBounties, setOnlyBounties] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (onlyBounties) {
      setDocsToShow(docs.filter((doc) => doc.bounty.value));
    } else {
      setDocsToShow(docs);
    }
  }, [onlyBounties]);

  const handleSubmit = async (query) => {
    console.log(query);
    if (query) {
      setSearching(true);
      const res = await fetch(
        process.env.NEXT_PUBLIC_ROOT_URL + "/api/search/[" + query._id + "]"
      );
      const json = await res.json();

      if (json.success) {
        setDocs(json.data);
        setDocsToShow(json.data);
      }
      setSearching(false);
    }
  };

  return (
    <ResultsContainer>
      <Grid container>
        <Grid item xs={12} md={8}>
          <TagHeader />
          <Grid item container xs={12}>
            <Grid item xs={12} md={6}>
              <TagSearch handleSubmit={handleSubmit} tags={tags} />
            </Grid>
            <Grid
              item
              container
              xs={12}
              md={6}
              sx={{
                justifyContent: ["flex", "flex-end"],
                alignContent: "flex-end",
              }}
            >
              <TagSearchRefinement setOnlyBounties={setOnlyBounties} />
            </Grid>
          </Grid>
          <Divider />
          {docsToShow.length ? (
            docsToShow.map((doc, index) => {
              return <Document key={index} doc={doc} />;
            })
          ) : (
            <Box sx={{ mt: "2vh", textAlign: "center" }}>
              {searching ? (
                <CircularProgress />
              ) : (
                "No papers for the selected tag"
              )}
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

export default tags;

export async function getServerSideProps({ res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=79"
  );
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_ROOT_URL + "/api/tags/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return {
      props: {
        tags: data.data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
