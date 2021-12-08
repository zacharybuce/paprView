import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import { Card, CardContent } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import CreateIcon from "@mui/icons-material/Create";
import Search from "../components/Search";

export default function Index() {
  return (
    <>
      <Box
        sx={{
          background:
            "linear-gradient(180deg, rgba(46,125,230,1) 0%, rgba(22,67,128,1) 68%)",
          height: "70vh",
          boxShadow: 3,
          m: "6vh 1vw 0vw 1vw",
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container sx={{ pt: "6vh" }}>
          <Grid
            container
            rowSpacing={0}
            alignItems="center"
            justifyContent="center"
          >
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
            <Grid item xs={12} sx={{ ml: "10vw", mr: "10vw", mt: "3vh" }}>
              <Search />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container sx={{ mt: "3vh" }}>
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
                  understand summaries from users just like you.
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
                  encourage learning above all else
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
      <Box sx={{ height: "20vh" }}></Box>
    </>
  );
}
