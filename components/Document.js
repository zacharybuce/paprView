import React from "react";
import { Box, Link, Button } from "@mui/material";

const Document = (props) => {
  return (
    <Box sx={{ ml: "10vw", mr: "10vw", mt: "2vh" }}>
      <Link
        href={"/summaries/" + props.doc._id}
        passHref
        style={{ textDecoration: "none" }}
      >
        <Button fullWidth>{props.doc.title}</Button>
      </Link>
    </Box>
  );
};

export default Document;
