import {
  Box,
  TextField,
  Grid,
  Button,
  IconButton,
  FormControl,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import AddTagDialog from "./AddTagDialog";
import { matchSorter } from "match-sorter";
import useSWR from "swr";

const ArticleCreateForm = () => {
  const router = useRouter();
  const [dateValue, setDateValue] = useState(null);
  const [docTags, setTags] = useState(null);
  const [articleTags, setArticleTags] = useState([]);
  const [docTitle, setTitle] = useState("");
  const [docAuthors, setAuthors] = useState([]);
  const [authorText, setAuthorText] = useState("");
  const [publisher, setPublisher] = useState("");
  const [addTag, setAddTag] = useState(false);
  const [open, setOpen] = useState(false);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    process.env.NEXT_PUBLIC_ROOT_URL + "/api/tags",
    fetcher
  );

  useEffect(() => {
    if (data) setTags(data.data);
  }, [data]);

  const filterOptions = (options, { inputValue }) => {
    const res = matchSorter(options, inputValue, { keys: ["name"] });
    if (res.length) {
      setAddTag(false);
      return res;
    } else {
      setAddTag(true);
      return [];
    }
  };
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
      tags: articleTags,
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
    <Box>
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
                  {docTags != null ? (
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={docTags}
                      onChange={(event, newValue) => {
                        let tagArr = newValue.map((tag) => tag._id);
                        setArticleTags(tagArr);
                        console.log(tagArr);
                      }}
                      getOptionLabel={(option) => option.name}
                      filterOptions={filterOptions}
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
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Box sx={{ mt: "2vh" }}>
                <Button type="submit" variant="contained" color="secondary">
                  Submit Document
                </Button>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ mt: "7vh" }}>
              <Grid container justifyContent="flex-end">
                {addTag ? (
                  <Button
                    onClick={() => setOpen(true)}
                    variant="contained"
                    color="secondary"
                  >
                    Add a Tag
                  </Button>
                ) : (
                  <div></div>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <AddTagDialog setTags={setTags} open={open} setOpen={setOpen} />
    </Box>
  );
};

export default ArticleCreateForm;
