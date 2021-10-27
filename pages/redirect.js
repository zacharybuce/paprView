import React from "react";
import { Box, Typography, Link, Button } from "@mui/material";

const redirect = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h4" sx={{ mt: "5vh" }}>
        The Document you are looking for is not found...
      </Typography>
      <Typography color="secondary" variant="h3" sx={{ mt: "3vh" }}>
        Be the first to add a summary!
      </Typography>
      <Link href="/articlecsearch" passHref style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary" sx={{ mt: "2vh" }}>
          Create a Summary
        </Button>
      </Link>
    </Box>
  );
};

export default redirect;
