import React from "react";
import { Box, Typography, Grid, Link } from "@mui/material";
import NextLink from "next/link";
const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#8e9299",
        height: "200px",
        marginTop: "calc(2% + 10px)",
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
                <Typography color="white">Home</Typography>
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
          <Grid item xs={6}>
            <NextLink href="/help" passHref>
              <Link style={{ textDecoration: "none" }}>
                <Typography color="white">Help</Typography>
              </Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;
