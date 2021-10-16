import { Typography, Box, TextField, Grid, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ArticleCreateForm = () => {
  const theme = useTheme();
  const [dateValue, setDateValue] = useState(null);
  const [docTags, setTags] = useState([]);
  const [docTitle, setTitle] = useState("");
  const [docAuthors, setAuthors] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const docData = {
      title: docTitle,
      authors: docAuthors,
      publishDate: dateValue,
      tags: docTags,
    };

    console.log(docData);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTags(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const names = [
    "Psycology",
    "Engineering",
    "Physics",
    "Economics",
    "Astronomy",
    "Biology",
    "Chemistry",
    "Medicine",
    "Health",
    "Nutrition",
    "Historical",
    "Technology",
    "Mathematics",
    "Social Science",
    "Politics",
  ];

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      autoComplete="off"
      noValidate
      sx={{
        mt: "2vh",
        mr: "10vw",
        ml: "10vw",
        borderRadius: "5px",
        boxShadow: 3,
      }}
    >
      <Box sx={{ p: "2vh" }}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          id="outlined-required"
          label="Article Title"
        />
        <TextField
          onChange={(e) => setAuthors(e.target.value)}
          fullWidth
          required
          id="outlined-required"
          label="Authors"
          sx={{ mt: "2vh" }}
        />
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Box sx={{ mt: "2vh", width: "100%" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  s
                  label="Publish Date"
                  value={dateValue}
                  onChange={(newValue) => {
                    setDateValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ mt: "2vh", width: "100%" }}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={docTags}
                  onChange={handleChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, docTags, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: "2vh" }}>
          <Button type="submit" variant="contained" color="secondary">
            Submit Document
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ArticleCreateForm;
