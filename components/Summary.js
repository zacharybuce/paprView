import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Collapse, Typography, Grid } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ReactHtmlParser from "react-html-parser";
import useInView from "react-cool-inview";
import Vote from "./Vote";
import fetch from "isomorphic-unfetch";
import braft from "../utils/summary.module.css";
import UserCard from "./UserCard";
import dynamic from "next/dynamic";

const DynamicAwardBountyButton = dynamic(() => import("./AwardBountyButton"));

const Summary = ({ summary, tags, awardBounty, articleBounty, sessionId }) => {
  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => {
      getUserInfo();

      unobserve();
    },
  });
  const [checked, setChecked] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const [height, setHeight] = useState(0);
  const [user, setUser] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    setHeight(ref.current.clientHeight);
    if (height > 400) setOverflow(true);
  });

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const getUserInfo = async () => {
    try {
      console.log();
      const res = await fetch(
        process.env.NEXT_PUBLIC_ROOT_URL + "/api/users/" + summary.user
      )
        .then((response) => response.json())
        .then((data) => {
          setUser(data.data);
        });
    } catch (error) {
      console.log(error);
    }
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
    const output = month + "\n" + day + "," + year;
    return output;
  };

  return (
    <Grid container>
      <Grid item xs={2} sm={1} sx={{ textAlign: "center" }}>
        <Vote
          disabled={sessionId != summary.user ? false : true}
          upvotes={summary.upvotes}
          downvotes={summary.downvotes}
          summaryId={summary._id}
          tags={tags}
        />

        {!summary.bounty.value && !articleBounty.value ? (
          ""
        ) : (
          <DynamicAwardBountyButton
            bounty={summary.bounty}
            awardBounty={awardBounty}
            awardee={summary.user}
            articleBounty={articleBounty}
            sessionId={sessionId}
            summaryId={summary._id}
          />
        )}
      </Grid>
      <Grid item xs={10} sm={11}>
        <Box
          sx={{
            mt: "4vh",
            mb: "4vh",
            borderRadius: "5px",
            // boxShadow: 3,
            // border: "solid",
            // borderWidth: "1px",
            // borderColor: "#8e9299",
          }}
        >
          <div ref={observe}>
            {user ? (
              <Box
                sx={{
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                  width: "100%",
                  //backgroundColor: "lightgrey",
                  mt: "1vh",
                }}
              >
                <Grid container>
                  <Grid item xs={6}>
                    <UserCard user={user} />
                  </Grid>

                  <Grid item xs={6}>
                    <Grid container justifyContent="flex-end">
                      <Grid item sx={{ mt: "1vh", mr: "1vw" }}>
                        <Typography variant="caption" color="gray">
                          {formatDate(summary.lastedit)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <div></div>
            )}
          </div>

          <Collapse in={checked} collapsedSize={401}>
            <Box
              className={braft["braft-output-content"]}
              ref={ref}
              sx={{ pt: 1, pb: 1, pl: 3, pr: 3 }}
            >
              {ReactHtmlParser(summary.content)}
            </Box>
          </Collapse>
          {overflow ? (
            <Box
              sx={{
                pb: "1vh",
                ml: "1vw",
                mr: "1vw",
                textAlign: "center",
                boxShadow: !checked ? "0 -5px 5px -5px #333" : "",
              }}
            >
              <Button color="secondary" onClick={handleChange}>
                <MoreHorizIcon sx={{ fontSize: "2rem" }} />
              </Button>
            </Box>
          ) : (
            <div></div>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Summary;
