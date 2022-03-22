import React from "react";
import { Box, Alert, AlertTitle } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const BountyChip = ({ bountyAmount }) => {
  return (
    <Box sx={{ mt: "1vh" }}>
      {bountyAmount ? (
        <Alert severity="primary" icon={<EmojiEventsIcon />}>
          <AlertTitle>
            There is a bounty on this article for{" "}
            <strong data-testid="bounty-banner-amount">{bountyAmount}</strong>{" "}
            points!
          </AlertTitle>
          The user who created this bounty can award your summary if they think
          you did a good job.
        </Alert>
      ) : (
        <div data-testid="no-bounty-banner"></div>
      )}
    </Box>
  );
};

export default BountyChip;
