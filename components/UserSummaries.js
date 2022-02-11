import React from "react";
import { useState, useEffect } from "react";
import { Box, Typography, Divider, CircularProgress } from "@mui/material";
import SummaryDisplay from "./SummaryDisplay";

const voteSort = (a, b) => {
  if (a.upvotes - a.downvotes < b.upvotes - b.downvotes) return 1;
  if (a.upvotes - a.downvotes > b.upvotes - b.downvotes) return -1;
  return 0;
};

const UserSummaries = (props) => {
  const [summaries, setSummaries] = useState(null);
  const [userId, setUserId] = useState(props.userId);

  useEffect(() => {
    getSummaries();
  }, [userId]);

  const getSummaries = async () => {
    const userSummaries = [];
    try {
      for (const summary of props.summaries) {
        var summaryRes = await fetch(
          process.env.NEXT_PUBLIC_ROOT_URL + "/api/summaries/" + summary
        );
        const summaryData = await summaryRes.json();

        const display = {
          title: summaryData.data.articletitle,
          articleId: summaryData.data.article,
          upvotes: summaryData.data.upvotes,
          downvotes: summaryData.data.downvotes,
          date: summaryData.data.lastedit,
        };
        userSummaries.push(display);
      }

      userSummaries.sort(voteSort);

      setSummaries(userSummaries);
      console.log(userSummaries);
    } catch (error) {
      console.log(error);
    }
  };

  const display = () => {
    if (summaries !== null && summaries.length === 0)
      return (
        <Box sx={{ p: 2 }}>
          <Typography>There are no summaries to display</Typography>
        </Box>
      );
    else {
      return (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
        </Box>
      );
    }
  };

  return (
    <Box sx={{ mt: "5vh" }}>
      <Typography variant="h6" sx={{ mb: "1vh" }}>
        Top Summaries
      </Typography>
      <Box
        component="div"
        sx={{
          borderRadius: 2,
          border: "solid",
          borderColor: "lightgrey",
          borderWidth: 1,
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        {summaries
          ? summaries.map((summary, index) => {
              if (index !== summary.length - 1)
                return (
                  <Box key={index + 10}>
                    <SummaryDisplay summary={summary} />
                    <Divider />
                  </Box>
                );
              return <SummaryDisplay key={index + 10} summary={summary} />;
            })
          : display()}
      </Box>
    </Box>
  );
};

export default UserSummaries;
