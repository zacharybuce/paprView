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
  [theme.breakpoints.down("lg")]: {
    fontSize: 16,
  },
}));

const AmountText = styled("Typography")(({ theme }) => ({
  [theme.breakpoints.between("xs", "sm")]: {
    fontSize: 10,
  },
  [theme.breakpoints.between("sm", "lg")]: {
    fontSize: 12,
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: 15,
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
    <Box sx={{ mt: "2vh" }}>
      <Grid container sx={{ mb: "1vh" }}>
        <Grid item xs={3} sm={2}>
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
            <AmountText>Summaries</AmountText>
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
            <AmountText>Comments</AmountText>
          </Box>
        </Grid>
        <Grid item xs={9} sm={10}>
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
                    <Grid key={tag} item sx={{ mt: "1vh" }}>
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
