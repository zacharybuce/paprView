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
  RadioGroup,
  Radio,
  Grid,
  Box,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import fetch from "isomorphic-unfetch";
import DisciplineTagIcon from "./DisciplineTagIcon";

const AddTagDialog = (props) => {
  const [tagName, setTagName] = useState("");
  const [state, setState] = useState(null);
  const [disciplines, setDisciplines] = useState([]);

  useEffect(() => {
    if (props.open) getDisciplines();
  }, [props.open]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagInfo = { name: tagName, disciplineName: state };

    if (tagName && state) {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_ROOT_URL + "/api/tags",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(tagInfo),
          }
        );

        const data = await res.json();
        props.setTags((prevState) => [...prevState, data.data]);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      console.log(tagInfo);
    }
  };

  const handleChange = (event) => {
    setState(event.target.value);
  };

  const getDisciplines = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_ROOT_URL + "/api/disciplines"
      );
      const data = await res.json();
      setDisciplines(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog fullWidth open={props.open} onClose={() => props.setOpen(false)}>
        <DialogTitle>Add a Tag</DialogTitle>

        <DialogContent>
          <form id="form" onSubmit={handleSubmit}>
            <FormGroup>
              <Grid container>
                <Grid item xs={6}>
                  <DialogContentText sx={{ mb: "1vh" }}>
                    Tag Name
                  </DialogContentText>
                  <TextField
                    label="Tag"
                    value={tagName}
                    onChange={(e) => {
                      setTagName(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DialogContentText sx={{ mb: "1vh" }}>
                    Discipline{" "}
                    <Tooltip title="A Discipline is the overarching topic that your tag falls under. Learn more about Disciplines on our Help page">
                      <HelpIcon />
                    </Tooltip>
                  </DialogContentText>
                  <Box sx={{ maxHeight: 300, overflow: "auto" }}>
                    <RadioGroup
                      row
                      aria-label="Disciplines"
                      name="row-radio-buttons-group"
                      onChange={handleChange}
                    >
                      {disciplines.length ? (
                        disciplines.map((discipline) => {
                          return (
                            <Grid
                              key={discipline.name}
                              container
                              xs={{ mb: "1vh" }}
                            >
                              <Grid item xs={2}>
                                <FormControlLabel
                                  value={discipline.name}
                                  control={<Radio />}
                                  label={""}
                                />
                              </Grid>
                              <Grid item xs={10}>
                                <DisciplineTagIcon
                                  withText={true}
                                  disciplineName={discipline.name}
                                />
                              </Grid>
                            </Grid>
                          );
                        })
                      ) : (
                        <CircularProgress />
                      )}
                    </RadioGroup>
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

export default AddTagDialog;
