import React, { useState } from "react";
import {
  Box,
  Grid,
  Slider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiInput from "@mui/material/Input";
import { useRouter } from "next/router";
const Input = styled(MuiInput)`
  width: 60px;
`;

const minReward = 40;
var rewAmount = minReward;

const BountyDialog = (props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(minReward);
  const [bountySubmit, setBountySubmit] = useState();

  const handleClose = () => {
    props.setOpenBountyDialog(false);
    if (bountySubmit) router.reload(window.location.pathname);
  };

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
    // setValue(
    //   event.target.value === ""
    //     ? ""
    //     : Number(event.target.value) - (Number(event.target.value) % 10)
    // );
  };

  const handleBlur = () => {
    if (value < minReward) {
      setValue(minReward);
    } else if (value > props.points) {
      setValue(props.points);
    } else if (value % 10 != 0) {
      setValue(value - (value % 10));
    }
  };

  const saveBounty = async () => {
    try {
      var article = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: {
          bounty: {
            user: props.userId,
            value: value,
          },
        },
      };

      var user = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: {
          points: value * -1,
        },
      };

      article.body.value = value;
      article.body = JSON.stringify(article.body);

      const putRes = await fetch("/api/articles/" + props.articleId, article);
      const putData = await putRes.json();
      console.log(putData);

      user.body.points = value * -1;
      user.body = JSON.stringify(user.body);
      const userPutRes = await fetch(
        process.env.NEXT_PUBLIC_ROOT_URL + "/api/users/" + props.userId,
        user
      );

      const userPutData = await userPutRes.json();
      console.log(userPutData);
      setBountySubmit({ success: true });
    } catch (error) {
      console.log(error);
      setBountySubmit({ success: false });
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={props.openBountyDialog}
      onClose={handleClose}
    >
      <DialogTitle> Set A Reward </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          How much of your points will you offer for a summary of this paper?
        </DialogContentText>
        <Box sx={{ mt: "3vh", ml: "20%", mr: "20%", mb: "3vh" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                min={minReward}
                max={props.points}
                step={10}
                value={typeof value === "number" ? value : minReward}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
              />
            </Grid>
            <Grid item>
              <Input
                value={value}
                size="small"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                  step: 10,
                  min: 0,
                  max: props.points,
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
            </Grid>
          </Grid>
          <Typography sx={{ fontSize: ".8rem" }}>
            A minimum of 40 points is required
          </Typography>
        </Box>
        <DialogActions>
          {!bountySubmit ? (
            <Button
              variant="contained"
              color="success"
              onClick={() => saveBounty()}
              disabled={props.points < 40}
            >
              Submit Reward
            </Button>
          ) : (
            <Alert severity={bountySubmit.success ? "success" : "error"}>
              {bountySubmit.success
                ? "Successfully created the Bounty!"
                : "An error occured while submitting..."}
            </Alert>
          )}
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default BountyDialog;
