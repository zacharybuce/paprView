import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import UserTagDisplay from "./UserTagDisplay";

const UserRanks = (props) => {
  const display = () => {
    if (props.ranks.length === 0) return <Typography>No Tags</Typography>;
    else {
      return <CircularProgress />;
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: "1vh" }}>
        Top Tags
      </Typography>
      <Box
        sx={{
          borderRadius: 2,
          border: "solid",
          borderColor: "lightgrey",
          borderWidth: 1,
        }}
      >
        {props.ranks
          ? props.ranks.map((rank, index) => {
              return (
                <UserTagDisplay
                  key={index}
                  tagId={rank.tag}
                  score={rank.value}
                />
              );
            })
          : display()}
      </Box>
    </Box>
  );
};

export default UserRanks;
