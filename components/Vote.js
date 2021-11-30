import React from "react";
import dynamic from "next/dynamic";
import { Box, IconButton, Typography, Grid } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState, useEffect, useRef } from "react";
import { useSession, signIn } from "next-auth/react";
import fetch from "isomorphic-unfetch";
const DynamicLoginDialog = dynamic(() => import("./LoginDialog"));

const Vote = (props) => {
  const { data: session } = useSession();
  const [vote, setVote] = useState({ upvote: false, downvote: false });
  const [totalVote, setTotalVote] = useState(props.upvotes - props.downvotes);
  const [upVote, setUpVote] = useState(props.upvotes);
  const [downVote, setDownVote] = useState(props.downvotes);
  const [timeout, setTimeOut] = useState(null);
  const [valUV, setValUV] = useState(props.upvotes);
  const [valDV, setValDV] = useState(props.downvotes);
  const [open, setOpen] = useState(false);

  const realVote = useRef();
  realVote.current = vote;
  const realUpVote = useRef();
  realUpVote.current = upVote;
  const realDownVote = useRef();
  realDownVote.current = downVote;
  const realValDV = useRef();
  realValDV.current = valDV;
  const realValUV = useRef();
  realValUV.current = valUV;

  useEffect(() => {
    console.log("total vote:" + props.upvotes + "-" + props.downvotes);
  }, []);

  useEffect(() => {
    console.log("in use Effect");
    console.log("session: " + session);
    if (session) {
      getUserVote();
    }
  }, [session]);

  useEffect(() => {
    setTotalVote(upVote - downVote);
  }, [vote]);

  const handleClick = async (id) => {
    if (session) {
      clearTimeout(timeout);
      changeVote(id);
      setTimeOut(
        setTimeout(() => {
          sendVotes();
        }, 500)
      );
    } else {
      setOpen(true);
    }
  };

  const changeVote = (id) => {
    if (id == "upvote") {
      if (vote.downvote) setDownVote(downVote - 1);
      setVote({ upvote: !vote.upvote, downvote: false });
      if (vote.upvote) setUpVote(upVote - 1);
      else setUpVote(upVote + 1);
    }
    if (id == "downvote") {
      if (vote.upvote) setUpVote(upVote - 1);
      setVote({ upvote: false, downvote: !vote.downvote });
      if (vote.downvote) setDownVote(downVote - 1);
      else setDownVote(downVote + 1);
    }
  };

  const getUserVote = () => {
    var userVotes = session.user.votes;
    console.log(userVotes);
    if (userVotes.some((e) => e.summaryId == props.summaryId)) {
      var uservote = userVotes.find((id) => id.summaryId == props.summaryId);
      setVote({ upvote: uservote.upvote, downvote: uservote.downvote });
    }
  };

  const sendVotes = async () => {
    console.log(realVote.current);
    console.log(realUpVote.current);
    console.log(realDownVote.current);
    const req = configReq();
    console.log(req);
    const resSum = await fetch("/api/summaries/" + props.summaryId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    const sumData = await resSum.json();

    console.log(sumData);

    const resUser = await fetch("/api/users/" + session.user._id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vote: {
          summaryId: props.summaryId,
          upvote: realVote.current.upvote,
          downvote: realVote.current.downvote,
        },
      }),
    });
    const userData = await resUser.json();

    console.log(userData);
  };

  const configReq = () => {
    var req = { upvote: 0, downvote: 0, tags: props.tags };

    if (realDownVote.current > realValDV.current) {
      req.downvote++;
    }
    if (realDownVote.current < realValDV.current) {
      req.downvote--;
    }
    if (realUpVote.current > realValUV.current) {
      req.upvote++;
    }
    if (realUpVote.current < realValUV.current) {
      req.upvote--;
    }

    setValDV(realDownVote.current);
    setValUV(realUpVote.current);
    return req;
  };

  const handleColor = (id) => {
    switch (id) {
      case "upvote":
        if (vote.upvote) return "primary";
        break;
      case "downvote":
        if (vote.downvote) return "secondary";
        break;
    }
  };

  return (
    <Grid container textAlign="center">
      <Grid item xs={12}>
        <IconButton
          onClick={() => handleClick("upvote")}
          color={handleColor("upvote")}
        >
          <KeyboardArrowUpIcon sx={{ fontSize: "3rem" }} />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{ fontSize: "1.5rem" }}>{totalVote}</Typography>
      </Grid>
      <Grid item xs={12}>
        <IconButton
          onClick={() => handleClick("downvote")}
          color={handleColor("downvote")}
        >
          <KeyboardArrowDownIcon sx={{ fontSize: "3rem" }} />
        </IconButton>
      </Grid>
      <DynamicLoginDialog open={open} setOpen={setOpen} signIn={signIn} />
    </Grid>
  );
};

export default Vote;
