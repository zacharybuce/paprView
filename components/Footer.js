import React from "react";
import { Box, Typography, Grid, Link } from "@mui/material";
import NextLink from "next/link";
const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#8e9299",
        height: "20vh",

        bottom: 0,
        width: "100%",
      }}
    >
      <Box sx={{ pt: "2vh", ml: "10vw", mr: "10vw" }}>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" color="secondary">
              paprView inc.
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" color="secondary">
              Company
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <NextLink href="/" passHref>
              <Link style={{ textDecoration: "none" }}>
                <Typography color="white">home</Typography>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={6}>
            <NextLink href="/privacy" passHref>
              <Link style={{ textDecoration: "none" }}>
                <Typography color="white">Privacy Policy</Typography>
              </Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;
