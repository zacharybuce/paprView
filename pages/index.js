import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
import Navbar from "../components/Navbar";
import Grid from "@mui/material/Grid";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { Card, CardContent, CardHeader } from "@mui/material";
import { fontSize, height } from "@mui/system";
import ForumIcon from "@mui/icons-material/Forum";
import CreateIcon from "@mui/icons-material/Create";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius + 5,
  backgroundColor: alpha(theme.palette.common.white, 1.0),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.75),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: "grey",
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "grey",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Index() {
  return (
    <>
      <Box
        sx={{
          background:
            "linear-gradient(180deg, rgba(45,156,200,1) 0%, rgba(29,102,131,1) 68%)",
          height: "70vh",
          boxShadow: 3,
          m: "0vh 1vw 0vw 1vw",
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
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search documents"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Grid>
            <Grid item xs={3} sx={{ mt: "3vh" }}>
              <Button fullWidth variant="contained" color="secondary">
                Search
              </Button>
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
      <Box sx={{ height: "5vh" }}></Box>
    </>
  );
}
