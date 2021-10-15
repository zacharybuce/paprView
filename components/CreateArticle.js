import React from "react";
import { useState } from "react";
import { Box, TextField } from "@mui/material";

const CreateArticle = () => {
  const [articleTitle, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (articleTitle) {
      console.log(articleTitle);
    }
  };

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      autoComplete="off"
      noValidate
      sx={{
        mt: "2vh",
        mr: "10vw",
        ml: "10vw",
        borderRadius: "5px",
        boxShadow: 3,
      }}
    >
      <Box sx={{ p: "2vh" }}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          id="outlined-required"
          label="Article Title"
        />
      </Box>
    </Box>
  );
};

export default CreateArticle;
