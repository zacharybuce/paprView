import React from "react";
import { IconButton, Tooltip, Box, Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const AwardBountyButton = ({
  bounty,
  awardBounty,
  awardee,
  articleBounty,
  sessionId,
  summaryId,
}) => {
  console.log(sessionId);
  console.log(bounty.user);
  if (sessionId == articleBounty.user && sessionId != awardee)
    return (
      <Tooltip title="Award your Bounty">
        <IconButton onClick={() => awardBounty(awardee, summaryId)}>
          <EmojiEventsIcon sx={{ fontSize: "30px" }} />
        </IconButton>
      </Tooltip>
    );

  if (bounty.value)
    return (
      <Box>
        <EmojiEventsIcon color="primary" sx={{ fontSize: "30px" }} />
        <Typography color="primary">+100</Typography>
      </Box>
    );

  return <div></div>;
};

export default AwardBountyButton;
