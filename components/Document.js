import React from "react";
import { Box, Link, Typography, Grid, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled, alpha } from "@mui/material/styles";
import TagChip from "./TagChip";

const Title = styled("Typography")(({ theme }) => ({
  fontSize: 20,
  "&:hover": {
    color: theme.palette.primary.light,
  },
}));

const printAuthors = (authors) => {
  var returnStr = "";

  for (const author of authors) {
    returnStr += author + ", ";
  }

  returnStr = returnStr.substring(0, returnStr.length - 2);

  return returnStr;
};

const formatDate = (date) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dateObj = new Date(date);
  const month = monthNames[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();
  const output = month + "\n" + day + ", " + year;
  return output;
};

const Document = (props) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;

  return (
    <Box sx={{ ml: "10vw", mr: "10vw", mt: "2vh" }}>
      <Grid container sx={{ mb: "1vh" }}>
        <Grid item xs={2}>
          <Box
            sx={{
              backgroundColor: primary,
              borderRadius: 3,
              color: "white",
              textAlign: "center",
              mr: "2vw",
              p: 1,
            }}
          >
            <Typography>{props.doc.summaries.length}</Typography>
            <Typography>Summaries</Typography>
          </Box>
          <Box
            sx={{
              textAlign: "center",
              mr: "2vw",
              p: 1,
              mt: "1vh",
              color: "gray",
            }}
          >
            <Typography>{props.doc.comments.length}</Typography>
            <Typography>Comments</Typography>
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Grid container>
            <Grid item xs={12}>
              <Link
                href={"/summaries/" + props.doc._id}
                passHref
                underline="none"
              >
                <Box sx={{}}>
                  <Title>{props.doc.title}</Title>
                </Box>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ mt: "1vh", color: "gray" }}>
                by {printAuthors(props.doc.authors)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ mt: "1vh" }}>
                Published on: {formatDate(props.doc.publishDate)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container justifyContent="flex-end" spacing={1}>
                {props.doc.tags.map((tag) => {
                  return (
                    <Grid item sx={{ mt: "1vh" }}>
                      <TagChip name={tag} />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
};

export default Document;
