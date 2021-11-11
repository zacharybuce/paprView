import React from "react";
import { useState, useEffect } from "react";
import { Box, Typography, Divider } from "@mui/material";
import SummaryDisplay from "./SummaryDisplay";

const voteSort = (a, b) => {
  if (a.upvotes - a.downvotes < b.upvotes - b.downvotes) return 1;
  if (a.upvotes - a.downvotes > b.upvotes - b.downvotes) return -1;
  return 0;
};

const UserSummaries = (props) => {
  const [summaries, setSummaries] = useState([]);

  useEffect(() => {
    getSummaries();
  }, [props]);

  const getSummaries = async () => {
    const userSummaries = [];
    try {
      for (const summary of props.summaries) {
        var summaryRes = await fetch(
          process.env.ROOT_URL + "/api/summaries/" + summary
        );
        const summaryData = await summaryRes.json();
        var articleRes = await fetch(
          process.env.ROOT_URL + "/api/articles/" + summaryData.data.article
        );
        const articleData = await articleRes.json();

        const display = {
          title: articleData.data.title,
          articleId: articleData.data._id,
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
        {summaries.length ? (
          summaries.map((summary, index) => {
            if (index !== summary.length - 1)
              return (
                <Box>
                  <SummaryDisplay summary={summary} />
                  <Divider />
                </Box>
              );
            return <SummaryDisplay summary={summary} />;
          })
        ) : (
          <Box sx={{ p: 2 }}>
            <Typography>There are no summaries to display</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UserSummaries;
