import React from "react";
import { useEffect, useState } from "react";
import { Box, Grid, Avatar, Link, Typography } from "@mui/material";
import RankIconDisplay from "./RankIconDisplay";

const rankSort = (a, b) => {
  if (a.value < b.value) return 1;
  if (a.value > b.value) return -1;
  return 0;
};

const setColor = (value) => {
  if (value >= 200) {
    return "#b9f2ff"; //diamond
  } else if (value >= 100) {
    return "#ffd700"; //gold
  } else if (value >= 50) {
    return "#94908e"; //silver
  } else if (value >= 25) {
    return "#6e3213"; //bronze
  } else {
    return "black";
  }
};

const UserCard = ({ user }) => {
  const [topRanks, setTopRanks] = useState(undefined);

  useEffect(() => {
    getTopRanks(user.ranks);
  }, []);

  const getTopRanks = (ranks) => {
    ranks.sort(rankSort);
    setTopRanks([ranks[0], ranks[1], ranks[2]]);
  };

  return (
    <Grid alignItems="center" spacing={1} container sx={{ pb: 1, pl: 1 }}>
      <Grid item sx={{ mb: "1vh" }}>
        <Avatar src={user.image} sx={{ width: 48, height: 48 }} />
      </Grid>
      <Grid item>
        <Grid container>
          <Grid item xs={12}>
            <Link
              underline="none"
              href={process.env.NEXT_PUBLIC_ROOT_URL + "/user/" + user._id}
              sx={{ color: "gray" }}
            >
              <Typography fontWeight={500}>{user.name}</Typography>
            </Link>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={2}>
              <Typography fontWeight={500} sx={{ fontSize: 15 }}>
                {user.credibility}
              </Typography>
            </Grid>
            {topRanks ? (
              topRanks.map((rank) => {
                if (rank != undefined && rank.value > 0) {
                  return (
                    <RankIconDisplay
                      color={setColor(rank.value)}
                      tagId={rank.tag}
                    />
                  );
                }
              })
            ) : (
              <div>n</div>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserCard;
