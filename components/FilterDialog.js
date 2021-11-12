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
  const [state, setState] = useState({});
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");

  useEffect(() => {
    if (props.open) getTags();
  }, [props.open]);

  useEffect(() => {
    setState({
      ...state,
      ["to"]: toDate,
      ["from"]: fromDate,
    });
  }, [toDate, fromDate]);

  const getTags = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_ROOT_URL + "/api/tags")
        .then((response) => response.json())
        .then((data) => {
          setTags(data.data);

          const obj = {};

          for (const key of tags) {
            obj[key] = false;
          }

          setState(obj);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let pattern = /[0-9]{0,4}/;

    const FromDate = fromDate ? fromDate : "2021";

    if (pattern.test(toDate) && pattern.test(FromDate)) props.setFilter(state);
    else alert("Invalid to and from date");
    console.log(state);
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div>
      <Dialog fullWidth open={props.open} onClose={() => props.setOpen(false)}>
        <DialogTitle>Filter Content</DialogTitle>

        <DialogContent>
          <form id="form" onSubmit={handleSubmit}>
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
                              control={
                                <Checkbox
                                  checked={state[tag.name]}
                                  onChange={handleChange}
                                  name={tag.name}
                                />
                              }
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
                    <TextField
                      label="From"
                      value={fromDate}
                      onChange={(e) => {
                        setFromDate(e.target.value);
                      }}
                    />
                  </Box>
                  <Box>
                    <TextField
                      label="To"
                      value={toDate}
                      onChange={(e) => {
                        setToDate(e.target.value);
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </FormGroup>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            form="form"
            variant="contained"
            onClick={() => props.setOpen(false)}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FilterDialog;
