import React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import fetch from "isomorphic-unfetch";
import TagChip from "./TagChip";

const FilterDialog = (props) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (props.open) getTags();
  }, [props.open]);

  const getTags = async () => {
    try {
      const res = await fetch(process.env.ROOT_URL + "/api/tags")
        .then((response) => response.json())
        .then((data) => {
          setTags(data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Dialog fullWidth open={props.open} onClose={() => props.setOpen(false)}>
        <DialogTitle>Filter Content</DialogTitle>
        <DialogContent>
          <FormGroup>
            <Grid container>
              <Grid item xs={6}>
                <DialogContentText>Filter by Tag</DialogContentText>
                {tags.length ? (
                  tags.map((tag) => {
                    return (
                      <Grid key={tag.name} container>
                        <Grid item>
                          <FormControlLabel
                            key={tag.name}
                            control={<Checkbox />}
                            label={""}
                          />
                        </Grid>
                        <Grid item>
                          <TagChip name={tag.name} />
                        </Grid>
                      </Grid>
                    );
                  })
                ) : (
                  <CircularProgress />
                )}
              </Grid>
              <Grid item xs={6}>
                <DialogContentText>Filter by Date (Year)</DialogContentText>
                <Box sx={{ mt: "1vh", mb: "1vh" }}>
                  <TextField label="From" />
                </Box>
                <Box>
                  <TextField label="To" />
                </Box>
              </Grid>
            </Grid>
          </FormGroup>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={() => props.setOpen(false)}>Cancel</Button> */}
          <Button variant="contained" onClick={() => props.setOpen(false)}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FilterDialog;
