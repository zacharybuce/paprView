import { Button } from "@mui/material";
import React from "react";

export const CreateBountyButton = ({ setOpenBountyDialog }) => {
  return (
    <Button
      onClick={() => setOpenBountyDialog(true)}
      color="primary"
      sx={{ mt: "1vh" }}
    >
      Create a Bounty
    </Button>
  );
};
