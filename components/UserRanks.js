import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import UserTagDisplay from "./UserTagDisplay";
const UserRanks = (props) => {
  const display = () => {
    if (props.ranks.length === 0)
      return <Typography data-testid="no-tags">No Tags</Typography>;
    else {
      return <CircularProgress />;
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: "1vh" }}>
        Top 5 Tags
      </Typography>
      <Box
        sx={{
          borderRadius: 2,
          border: "solid",
          borderColor: "lightgrey",
          borderWidth: 1,
        }}
      >
        {props.ranks.length
          ? props.ranks.map((rank, index) => {
              if (index < 5)
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
