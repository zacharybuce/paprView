import React from "react";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import UserTagDisplay from "./UserTagDisplay";

const UserRanks = (props) => {
  const [tags, setTags] = useState([]);

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
        {props.ranks ? (
          props.ranks.map((rank, index) => {
            return (
              <UserTagDisplay key={index} tagId={rank.tag} score={rank.value} />
            );
          })
        ) : (
          <div></div>
        )}
      </Box>
    </Box>
  );
};

export default UserRanks;
