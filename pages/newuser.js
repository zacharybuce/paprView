import React from "react";
import { Box, Typography, Link, Fade } from "@mui/material";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useSession, getSession } from "next-auth/react";

const ResultsContainer = styled("div")(({ theme }) => ({
  marginTop: "30vh",
  marginRight: "10vw",
  marginLeft: "10vw",
  marginBottom: "49vh",
  [theme.breakpoints.up("xl")]: {
    marginRight: "25vw",
    marginLeft: "25vw",
  },
}));

const newuser = () => {
  useEffect(() => {}, []);

  return (
    <ResultsContainer>
      <Fade in={true} timeout={1000}>
        <Typography color="primary" variant="h1" sx={{ mb: "1vh" }}>
          Welcome to paprView
        </Typography>
      </Fade>
      <Fade in={true} timeout={1000}>
        <Typography variant="h5" sx={{ mb: "5vh", textAlign: "center" }}>
          Thank you for joining the paprView beta
        </Typography>
      </Fade>
      <Fade in={true} timeout={1000}>
        <Typography sx={{ fontSize: 20 }}>
          paprView is a platform for users to view and submit summaries of
          academic articles. We reccomend going through our{" "}
          <Link href="/help">help page</Link> to get an idea of how paprView
          works.
        </Typography>
      </Fade>
    </ResultsContainer>
  );
};

export default newuser;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session.user.votes) {
    console.log(session);
    try {
      const userPutRes = await fetch(
        process.env.NEXT_PUBLIC_ROOT_URL + "/api/users/" + session.user._id,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            votes: [],
          }),
        }
      );
      const userPutData = await userPutRes.json();
      console.log(userPutData);
    } catch (error) {
      console.log(error);
    }
  }
  if (!session.user.joinDate) {
    try {
      var d1 = new Date();
      var str = d1.toISOString().slice(0, -5);

      const userPutRes = await fetch(
        process.env.NEXT_PUBLIC_ROOT_URL + "/api/users/" + session.user._id,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: str,
          }),
        }
      );
      const userPutData = await userPutRes.json();
      console.log(userPutData);
    } catch (error) {
      console.log(error);
    }
  }

  return { props: { session: session } };
}
