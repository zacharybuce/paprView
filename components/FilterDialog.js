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
  Autocomplete,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";

const FilterDialog = (props) => {
  const [tags, setTags] = useState([]);
  const [state, setState] = useState({});
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");

  // useEffect(() => {
  //   if (props.open) getTags();
  // }, [props.open]);

  useEffect(() => {
    setState({
      ...state,
      ["to"]: toDate,
      ["from"]: fromDate,
    });
  }, [toDate, fromDate]);

  const fetcher = (...args) =>
    fetch(...args).then((res) =>
      res.json().then((data) => {
        setTags(data.data);

        const obj = {};

        for (const key of tags) {
          obj[key] = false;
        }

        setState(obj);
      })
    );
  const { data, error } = useSWR(
    process.env.NEXT_PUBLIC_ROOT_URL + "/api/tags",
    fetcher
  );
  // const getTags = async () => {
  //   try {
  //     useSWR(process.env.NEXT_PUBLIC_ROOT_URL + "/api/tags", fetcher);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = (e) => {
    console.log("here");
    e.preventDefault();

    let pattern = /[0-9]{0,4}/;

    const FromDate = fromDate ? fromDate : "2022";

    if (pattern.test(toDate) && pattern.test(FromDate)) {
      props.setFilter(state);
    } else alert("Invalid to and from date");
    console.log(state);
    props.setOpen(false);
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
          <Box
            onSubmit={handleSubmit}
            component="form"
            autoComplete="off"
            noValidate
          >
            <Grid container>
              <Grid item xs={12} sx={{ mb: "1vh" }}>
                <DialogContentText sx={{ mb: "1vh" }}>
                  Filter by Tag
                </DialogContentText>
                {tags.length ? (
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={tags}
                    onChange={(event, newValue) => {
                      let tagArr = newValue.map((tag) => tag._id);
                      setState({
                        ...state,
                        [tagArr]: true,
                      });
                    }}
                    getOptionLabel={(option) => option.name}
                    //filterOptions={filterOptions}
                    noOptionsText="Click Add a Tag"
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          label="Tags*"
                          placeholder="Tags"
                        />
                      );
                    }}
                  />
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
            <Button
              type="submit"
              variant="contained"
              onClick={() => {
                console.log("here");
              }}
            >
              Apply
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FilterDialog;
