import React from "react";
import { Box, Link, Typography, Grid, Divider, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import ArticleTagChip from "./ArticleTagChip";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import useInView from "react-cool-inview";
const Title = styled("div")(({ theme }) => ({
  fontSize: 20,
  "&:hover": {
    color: theme.palette.primary.light,
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: 16,
  },
}));

const AmountText = styled("div")(({ theme }) => ({
  [theme.breakpoints.between("xs", "sm")]: {
    fontSize: 10,
  },
  [theme.breakpoints.between("sm", "lg")]: {
    fontSize: 11,
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
  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => {
      unobserve();
    },
  });
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  return (
    <Box sx={{ mt: "2vh" }}>
      <Grid container sx={{ mb: "1vh" }}>
        <Grid item xs={3} sm={2}>
          <Box
            sx={{
              backgroundColor: props.doc.summaries.length ? primary : "none",
              borderRadius: 3,
              color: props.doc.summaries.length ? "white" : primary,
              textAlign: "center",
              border: props.doc.summaries.length ? "" : "solid",
              borderColor: props.doc.summaries.length ? "" : primary,
              borderWidth: "1px",
              mr: "2vw",
              p: 1,
            }}
          >
            <Typography>{props.doc.summaries.length}</Typography>
            <AmountText>Summaries</AmountText>
          </Box>
          {/* <Box
            sx={{
              textAlign: "center",
              mr: "2vw",48a868
              p: 1,
              mt: "1vh",
              color: "gray",
            }}
          >
            <Typography>{props.doc.comments.length}</Typography>
            <AmountText>Comments</AmountText>
          </Box> */}
          {props.doc.bounty.value ? (
            <Box
              sx={{
                color: primary,
                textAlign: "center",
                mr: "2vw",
                mt: "1vh",
              }}
            >
              <EmojiEventsIcon sx={{ position: "relative", top: "4px" }} /> +
              {props.doc.bounty.value}
            </Box>
          ) : (
            ""
          )}
        </Grid>
        <Grid item container xs={9} sm={10}>
          <Grid item xs={12}>
            <Link href={"/summaries/" + props.doc._id} underline="none">
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
          <Grid item xs={12}>
            <Typography sx={{ mt: "1vh" }}>
              Published on: {formatDate(props.doc.publishDate)}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mt: ".5vh", mb: ".5vh" }}>
            <div ref={observe}>
              {inView ? (
                <span>
                  {props.doc.tags.map((tag) => {
                    return <ArticleTagChip tagId={tag} />;
                  })}
                </span>
              ) : (
                <div></div>
              )}
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
};

export default Document;
