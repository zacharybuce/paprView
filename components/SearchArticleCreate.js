import React from "react";
import { useState, useEffect } from "react";
import { Box, Button, Link, TextField, Typography, Fade } from "@mui/material";

const SearchArticleCreate = () => {
  const [articleTitle, setTitle] = useState("");
  const [respTitles, setRespTitles] = useState([]);

  useEffect(() => {}, [respTitles]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (articleTitle) {
      console.log(articleTitle);
      setRespTitles(searchArticleNames(articleTitle));
    }
  };

  const searchArticleNames = (articleTitle) => {
    if (articleTitle == "test") return [{ name: "Test title" }];
    else
      return [
        { name: "Test title other" },
        { name: "Test title2" },
        { name: "Test title3" },
      ];
  };

  return (
    <>
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

      <Fade in={Boolean(respTitles.length ? true : false)} timeout={800}>
        <div>
          <Box>
            {respTitles.length ? (
              <Typography variant="h6" align="center" sx={{ mt: "2vh" }}>
                Select your Document
              </Typography>
            ) : (
              <div></div>
            )}
          </Box>

          <Box
            sx={{
              mt: "2vh",
              mr: "10vw",
              ml: "10vw",
              borderRadius: "5px",
              boxShadow: 3,
            }}
          >
            {respTitles.map((title) => {
              return (
                <Box sx={{ p: 2, width: "100%" }}>
                  <Button
                    fullWidth
                    sx={{ justifyContent: "flex-start", fontStyle: "italic" }}
                  >
                    {title.name}
                  </Button>
                </Box>
              );
            })}
          </Box>

          <Box sx={{ mt: "2vh", mr: "10vw", ml: "10vw" }}>
            {respTitles.length ? (
              <Link
                href="/articlecform"
                passHref
                style={{ textDecoration: "none" }}
              >
                <Button fullWidth variant="contained" color="secondary">
                  None of these are the Document
                </Button>
              </Link>
            ) : (
              <div></div>
            )}
          </Box>
        </div>
      </Fade>
    </>
  );
};

export default SearchArticleCreate;
