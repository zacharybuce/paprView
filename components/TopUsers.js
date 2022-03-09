import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import UserCard from "./UserCard";

const topUser1 = {
  _id: "620b9884ed54a6b369a8a5ef",
  name: "Michael Whitford",
  image:
    "https://lh3.googleusercontent.com/a/AATXAJzw2d3-F4l0wTj9ZJFYFh9xiXAcCODRM2U-DbW0=s96-c",
  emailVerified: null,
  votes: [],
  summaries: [],
  ranks: [],
  points: "",
};
const topUser2 = {
  _id: "62066ae1235634b666df5abf",
  name: "Zachary Buce",
  image:
    "https://lh3.googleusercontent.com/a-/AOh14GgInUnDXLZEUk5qHRI28br_zIc-bPluf9S3TMeP6Q=s96-c",
  ranks: [],
  points: "",
};
const topUser3 = {
  _id: "620b9884ed54a6b369a8a5ef",
  name: "Michael Whitford",
  image:
    "https://lh3.googleusercontent.com/a/AATXAJzw2d3-F4l0wTj9ZJFYFh9xiXAcCODRM2U-DbW0=s96-c",
  emailVerified: null,
  votes: [],
  summaries: [],
  ranks: [],
  points: "",
};

const TopUsers = () => {
  return (
    <Box
      sx={{
        border: "solid",
        borderWidth: 1,
        p: 3,
        borderRadius: 2,
        borderColor: "lightgrey",
        backgroundColor: "white",
        ml: "3vw",
      }}
    >
      <Typography sx={{ fontSize: 30, mb: "1vh" }}>Top Users</Typography>
      {/* <Grid containter>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
          spacing={1}
        >
          <Grid item xs={2} sx={{ fontSize: "1.75rem", textAlign: "center" }}>
            🥇
          </Grid>
          <Grid item xs={10}>
            <UserCard user={topUser1} isTopUser />
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
          spacing={1}
        >
          <Grid item xs={2} sx={{ fontSize: "1.75rem", textAlign: "center" }}>
            🥈
          </Grid>
          <Grid item xs={10}>
            <UserCard user={topUser2} isTopUser />
          </Grid>
        </Grid>
      </Grid> */}
    </Box>
  );
};

export default TopUsers;
