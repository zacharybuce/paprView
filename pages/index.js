import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import {
  Card,
  CardContent,
  Container,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import CreateIcon from "@mui/icons-material/Create";
import Search from "../components/Search";

const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  [theme.breakpoints.up("sm")]: {
    top: "10%",
  },
}));

const BackContainer = styled("div")(({ theme }) => ({
  background:
    "linear-gradient(180deg, rgba(46,125,230,1) 0%, rgba(22,67,128,1) 68%)",
  height: "70vh",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    height: "100%",
    paddingBottom: "4vh",
  },
}));

export default function Index() {
  return (
    <>
      <BackContainer>
        <SearchContainer>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={12}>
              <Typography
                align="center"
                variant="h2"
                sx={{ color: "white", mt: "10vh" }}
              >
                Search for any Document
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center" sx={{ color: "white", mt: "6vh" }}>
                Find summaries from other users that are concise and easy to
                understand
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mt: "3vh" }}>
              <Search />
            </Grid>
          </Grid>
        </SearchContainer>
      </BackContainer>
      <Container sx={{ mt: "5vh" }}>
        <Grid
          container
          direction="row"
          spacing={5}
          alignItems="center"
          justifyContent="center"
          align="center"
        >
          <Grid item xs={9} md={4}>
            <Card sx={{ minHeight: "33vh" }}>
              <CardContent>
                <Typography variant="h5">Search</Typography>
                <SearchIcon color="secondary" sx={{ fontSize: "5rem" }} />
                <Typography>
                  Search for any non-fiction, historical, or scientific
                  articles, papers, journals, and essays to find easy to
                  understand summaries from other members of the community.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={9} md={4}>
            <Card sx={{ minHeight: "33vh" }}>
              <CardContent>
                <Typography variant="h5">Discuss</Typography>
                <ForumIcon color="secondary" sx={{ fontSize: "5rem" }} />
                <Typography>
                  Talk to other users about the document you searched for. You
                  can ask a question or discuss the content, either way, we
                  encourage learning above all else (not in beta).
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={9} md={4}>
            <Card sx={{ minHeight: "33vh" }}>
              <CardContent>
                <Typography variant="h5">Create</Typography>
                <CreateIcon color="secondary" sx={{ fontSize: "5rem" }} />
                <Typography>
                  Interested in sharing your Knowledge? Create a summary now and
                  add to the growing collection of user submitted summaries.{" "}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
