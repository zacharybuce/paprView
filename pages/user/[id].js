import React from "react";
import { Box, Typography, Avatar, Grid, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import UserSummaries from "../../components/UserSummaries";
import ParaglidingIcon from "@mui/icons-material/Paragliding";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const UserContainer = styled("div")(({ theme }) => ({
  marginTop: "10vh",
  marginRight: "10vw",
  marginLeft: "10vw",
  marginBottom: "7vh",
  [theme.breakpoints.up("xl")]: {
    marginRight: "25vw",
    marginLeft: "25vw",
  },
}));

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

const user = (props) => {
  const session = useSession();
  const router = useRouter();

  return (
    <UserContainer>
      <Grid container>
        <Grid item xs={2}>
          <Avatar src={props.user.image} sx={{ height: 100, width: 100 }} />
        </Grid>
        <Grid item xs={10}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h3">{props.user.name}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ mt: "1vh" }}>
              <Grid container>
                <Tooltip title="Dropped in on" arrow placement="top">
                  <ParaglidingIcon sx={{ mr: ".5vw" }} />
                </Tooltip>
                <Typography>{formatDate(props.user.joinDate)}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <UserSummaries summaries={props.user.summaries} />
    </UserContainer>
  );
};

export async function getServerSideProps(context) {
  try {
    const userRes = await fetch(
      process.env.ROOT_URL + "/api/users/" + context.params.id
    );
    const userData = await userRes.json();

    return { props: { user: userData.data } };
  } catch (error) {
    console.log(error);
  }
}

export default user;
