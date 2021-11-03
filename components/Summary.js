import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Collapse,
  Avatar,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import useInView from "react-cool-inview";
import "braft-editor/dist/index.css";

const Summary = (props) => {
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
        process.env.ROOT_URL + "/api/users/" + props.userId
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
              // backgroundColor: "#8e9299",
              mt: "1vh",
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Grid
                  alignItems="center"
                  spacing={1}
                  container
                  sx={{ pb: 1, pl: 1 }}
                >
                  <Grid item>
                    <Avatar src={user.image} />
                  </Grid>
                  <Grid item>
                    <Typography color="gray">{user.name}</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Grid container justifyContent="flex-end">
                  <Grid item sx={{ mt: "1vh", mr: "1vw" }}>
                    <Typography variant="caption" color="gray">
                      {formatDate(props.lastedit)}
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
        <Box ref={ref} sx={{ pt: 1, pb: 1, pl: 3, pr: 3 }}>
          {ReactHtmlParser(props.content)}
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
  );
};

export default Summary;
