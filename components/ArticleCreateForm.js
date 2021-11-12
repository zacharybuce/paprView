import {
  Box,
  TextField,
  Grid,
  Button,
  IconButton,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import fetch from "isomorphic-unfetch";

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

const ArticleCreateForm = ({ tags }) => {
  const theme = useTheme();
  const router = useRouter();
  const [dateValue, setDateValue] = useState(null);
  const [docTags, setTags] = useState([]);
  const [docTitle, setTitle] = useState("");
  const [docAuthors, setAuthors] = useState([]);
  const [authorText, setAuthorText] = useState("");
  const [publisher, setPublisher] = useState("");

  const article = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: {},
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const docData = {
      title: docTitle,
      views: 0,
      authors: docAuthors,
      publisher: publisher,
      publishDate: dateValue,
      tags: docTags,
      summaries: [],
      comments: [],
    };

    docData.authors.unshift(authorText);

    console.log(docData);

    article.body = JSON.stringify(docData);

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_ROOT_URL + "/api/articles",
        article
      )
        .then((response) => response.json())
        .then((data) => {
          router.push({
            pathname: "/editor",
            query: { articleId: data.data._id },
          });
        });
    } catch (error) {
      console.log(error);
    }
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

  const handleChangeText = (e) => {
    setAuthorText(e.target.value);
  };
  const addValue = () => {
    setAuthors([...docAuthors, ""]);
  };
  const handleValueChange = (index, e) => {
    const updatedValues = docAuthors.map((value, i) => {
      if (i === index) {
        return e.target.value;
      } else {
        return value;
      }
    });
    setAuthors(updatedValues);
  };
  const deleteValue = (jump) => {
    setAuthors(docAuthors.filter((j) => j !== jump));
  };

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
        {/* <TextField
          onChange={(e) => setAuthors(e.target.value)}
          required
          id="outlined-required"
          label="Authors"
          sx={{ mt: "2vh" }}
        /> */}
        <div>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                autoFocus
                value={authorText}
                onChange={handleChangeText}
                required
                fullWidth
                label="Author"
                sx={{ mt: "2vh" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(e) => setPublisher(e.target.value)}
                fullWidth
                label="Publisher"
                sx={{ mt: "2vh" }}
              />
            </Grid>
          </Grid>
          {docAuthors.map((jump, index) => (
            <Box key={"jump" + index}>
              <Grid container alignItems="flex-end">
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Author"
                    value={jump || ""}
                    onChange={(e) => handleValueChange(index, e)}
                    sx={{ width: "50%" }}
                  />

                  <IconButton
                    onClick={() => deleteValue(jump)}
                    aria-label="delete"
                    sx={{ mt: "2vh" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          ))}
          <Box>
            <Button onClick={addValue} color="primary" sx={{ ml: "1vw" }}>
              Add Author
            </Button>
          </Box>
        </div>
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
                <InputLabel required id="demo-multiple-chip-label">
                  Tags
                </InputLabel>
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
                  {tags.map((tag) => (
                    <MenuItem
                      key={tag.name}
                      value={tag.name}
                      style={getStyles(tag.name, docTags, theme)}
                    >
                      {tag.name}
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
