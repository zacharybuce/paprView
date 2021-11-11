import { Box, Grid, Link, Typography, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import NextLink from "next/link";

const formatDate = (date) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dateObj = new Date(date);
  const month = monthNames[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();
  const output = month + "\n" + day + ", " + year;
  return output;
};

const SummaryDisplay = (props) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const total = props.summary.upvotes - props.summary.downvotes;

  const getColor = () => {
    if (total > 0) return primary;
    if (total === 0) return "none";
    if (total < 0) return secondary;
  };

  return (
    <Grid container sx={{ m: 1 }}>
      <Grid item xs={1}>
        <Tooltip title="votes" arrow placement="left">
          <Box
            sx={{
              borderRadius: 2,
              backgroundColor: getColor(),
              color: total ? "white" : "gray",
              textAlign: "center",
              mr: "1vw",
              p: 1,
            }}
          >
            <Typography>
              {props.summary.upvotes - props.summary.downvotes}
            </Typography>
          </Box>
        </Tooltip>
      </Grid>
      <Grid item xs={9} sx={{ pt: 1 }}>
        <NextLink href={"/summaries/" + props.summary.articleId} passHref>
          <Link underline="none">
            <Typography noWrap>{props.summary.title}</Typography>
          </Link>
        </NextLink>
      </Grid>
      <Grid item xs={2}>
        <Typography sx={{ fontSize: 11, color: "gray", ml: "2vw", pt: 1 }}>
          {formatDate(props.summary.date)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SummaryDisplay;
