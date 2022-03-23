import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import UserCard from "./UserCard";

const topUser2 = {
  _id: "622652a1e38271a36b534c34",
  name: "Zachary Buce",
  image:
    "https://lh3.googleusercontent.com/a-/AOh14GgInUnDXLZEUk5qHRI28br_zIc-bPluf9S3TMeP6Q=s96-c",
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
      <Grid containter>
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
            <UserCard user={topUser2} isTopUser />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TopUsers;
