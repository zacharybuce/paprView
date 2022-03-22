import { Button } from "@mui/material";
import React from "react";

export const CreateBountyButton = ({ setOpenBountyDialog }) => {
  return (
    <Button
      data-testid="button-render"
      onClick={() => setOpenBountyDialog(true)}
      color="primary"
      sx={{ mt: "1vh" }}
    >
      Create a Bounty
    </Button>
  );
};
