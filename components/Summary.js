import React, { useState } from "react";
import { Box, Button, Collapse, Avatar, Typography, Grid } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

const Summary = (props) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
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
        mr: "10vw",
        ml: "10vw",
        mb: "4vh",
        borderRadius: "5px",
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          width: "100%",
          backgroundColor: "#8e9299",
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
                <Avatar>PV</Avatar>
              </Grid>
              <Grid item>
                <Typography color="white">TestUser</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container justifyContent="flex-end">
              <Grid item sx={{ mt: "1vh", mr: "1vw" }}>
                <Typography variant="caption" color="white">
                  {formatDate(props.lastedit)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Collapse in={checked} collapsedSize={400}>
        <Box sx={{ pt: 1, pb: 1, pl: 3, pr: 3 }}>
          {ReactHtmlParser(props.content)}
          {ReactHtmlParser(props.content)}
          {ReactHtmlParser(props.content)}
          {ReactHtmlParser(props.content)}
        </Box>
      </Collapse>
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
    </Box>
  );
};

export default Summary;
