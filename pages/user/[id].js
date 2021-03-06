import React, { useState } from "react";
import {
  Typography,
  Avatar,
  Grid,
  Tooltip,
  Box,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import UserSummaries from "../../components/UserSummaries";
import ParaglidingIcon from "@mui/icons-material/Paragliding";
import UserRanks from "../../components/UserRanks";
import CreateIcon from "@mui/icons-material/Create";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import EditNameDialog from "../../components/EditNameDialog";

const rankSort = (a, b) => {
  if (a.value < b.value) return 1;
  if (a.value > b.value) return -1;
  return 0;
};

const UserContainer = styled("div")(({ theme }) => ({
  marginTop: "10vh",
  marginRight: "10vw",
  marginLeft: "10vw",
  marginBottom: "7vh",
  [theme.breakpoints.up("xl")]: {
    marginRight: "25vw",
    marginLeft: "25vw",
  },
  [theme.breakpoints.down("sm")]: {
    marginRight: "3vw",
    marginLeft: "3vw",
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

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const user = (props) => {
  const { data: session } = useSession();
  const [newName, setNewName] = useState();
  const [editing, setEditing] = useState(false);
  const { data, error } = useSWR(
    process.env.NEXT_PUBLIC_ROOT_URL + "/api/users/" + props.id,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (!data)
    return (
      <Box sx={{ mt: "30vh", mb: "30vh", textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );

  const changeName = async () => {
    if (!newName) return;

    setEditing(false);

    var user = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        name: newName,
      },
    };
    user.body = JSON.stringify(user.body);
    const res = await fetch(
      process.env.NEXT_PUBLIC_ROOT_URL + "/api/users/" + props.id,
      user
    );
  };

  return (
    <UserContainer>
      <Grid container spacing={1}>
        <Grid item xs={12} md={2}>
          <Avatar src={data.data.image} sx={{ height: 100, width: 100 }} />
        </Grid>
        <Grid item container xs={12} md={10}>
          <Grid item md={12}>
            <Typography variant="h3">
              {data.data.name}

              {session && session.user._id == props.id ? (
                <IconButton onClick={() => setEditing(true)}>
                  <CreateIcon />
                </IconButton>
              ) : (
                ""
              )}
            </Typography>
          </Grid>
          <Grid item container md={12} sx={{ mt: "1vh" }}>
            <Tooltip title="Dropped in on" arrow placement="top">
              <ParaglidingIcon sx={{ mr: ".5vw" }} />
            </Tooltip>
            <Typography>{formatDate(data.data.joinDate)}</Typography>
          </Grid>
        </Grid>
        <Grid item container direction="column" md={2} sx={{ mt: "4vh" }}>
          <Box>
            <Typography variant="h6" sx={{ mb: "1vh" }}>
              Stats
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                borderRadius: 2,
                border: "solid",
                borderColor: "lightgrey",
                borderWidth: 1,

                p: 1,
                mr: "1vw",
              }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Typography>Points</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h5" sx={{ textAlign: "center" }}>
                    <b>{data.data.points ? data.data.points : 0}</b>
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Typography>Summaries</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h5" sx={{ textAlign: "center" }}>
                    <b>{data.data.summaries.length}</b>
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Typography>Tags</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h5" sx={{ textAlign: "center" }}>
                    <b>{data.data.ranks.length}</b>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={10} sx={{ mt: "4vh" }}>
          <UserRanks ranks={data.data.ranks.sort(rankSort)} />
          <UserSummaries userId={props.id} />
        </Grid>
      </Grid>
      <EditNameDialog
        editing={editing}
        setEditing={setEditing}
        setNewName={setNewName}
        changeName={changeName}
      />
    </UserContainer>
  );
};

export async function getServerSideProps(context) {
  try {
    return { props: { id: context.params.id } };
  } catch (error) {
    console.log(error);
  }
}

export default user;
