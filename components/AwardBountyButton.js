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
  if (sessionId == articleBounty.user && sessionId != awardee)
    return (
      <Tooltip title="Award your Bounty">
        <IconButton
          data-testid="can-award-bounty"
          onClick={() => awardBounty(awardee, summaryId)}
        >
          <EmojiEventsIcon sx={{ fontSize: "30px" }} />
        </IconButton>
      </Tooltip>
    );

  if (bounty.value)
    return (
      <Box data-testid="bounty-exists">
        <EmojiEventsIcon color="primary" sx={{ fontSize: "30px" }} />
        <Typography color="primary">+{bounty.value}</Typography>
      </Box>
    );

  return <div></div>;
};

export default AwardBountyButton;
