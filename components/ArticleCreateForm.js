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
import { styled } from "@mui/material/styles";
import HowToUseTagsDialog from "./HowToUseTagsDialog";

const FormContainer = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    marginRight: "10vw",
    marginLeft: "10vw",
  },
  [theme.breakpoints.down("sm")]: {
    marginRight: "0vw",
    marginLeft: "0vw",
  },
}));

const ArticleCreateForm = () => {
  const router = useRouter();
  const [dateValue, setDateValue] = useState(null);
  const [docTags, setTags] = useState(null); //all of the tags, not the ones for this specific article
  const [articleTags, setArticleTags] = useState([]);
  const [docTitle, setTitle] = useState("");
  const [docAuthors, setAuthors] = useState([]);
  const [authorText, setAuthorText] = useState("");
  const [publisher, setPublisher] = useState("");
  const [addTag, setAddTag] = useState(false);
  const [open, setOpen] = useState(false);
  const [articleTagsError, setArticleTagsError] = useState(false);
  const [docAuthorsError, setDocAuthorsError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [tagErrorText, setTagErrorText] = useState("");
  const [howToOpen, setHowToOpen] = useState(true);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    process.env.NEXT_PUBLIC_ROOT_URL + "/api/tags",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
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
    let errors = false;

    if (articleTags.length == 0) {
      setArticleTagsError(true);
      setTagErrorText("Please enter at least one tag.");
      errors = true;
    }

    if (articleTags.length >= 5) {
      setArticleTagsError(true);
      setTagErrorText("Only 5 tags are allowed.");
      errors = true;
    }

    if (docTitle == "") {
      setTitleError(true);
      errors = true;
    }

    if (authorText == "") {
      setDocAuthorsError(true);
      errors = true;
    }

    if (Date.parse(dateValue) > Date.now()) {
      console.log("in");
      setDateError(true);
      errors = true;
    }

    if (errors) return;

    const docData = {
      title: docTitle,
      views: 0,
      authors: docAuthors,
      publisher: publisher,
      publishDate: dateValue,
      tags: articleTags,
      summaries: [],
      comments: [],
      bounty: {},
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
            pathname: "/summaries/" + data.data._id,
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
    <FormContainer>
      <Box
        onSubmit={handleSubmit}
        component="form"
        autoComplete="off"
        noValidate
        sx={{
          borderRadius: "5px",
          boxShadow: 3,
        }}
      >
        <Box sx={{ p: "2vh" }}>
          <TextField
            data-testid="Title"
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            error={titleError}
            helperText={titleError ? "Please enter a title." : ""}
            id={titleError ? "outlined-error" : "outlined-required"}
            label="Paper Title"
          />
          <div>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  data-testid="Author"
                  autoFocus
                  value={authorText}
                  onChange={handleChangeText}
                  required
                  error={docAuthorsError}
                  fullWidth
                  label={"Author"}
                  helperText={
                    docAuthorsError ? "Please enter at least one author." : ""
                  }
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
                      label={"Author"}
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box data-testid="Date" sx={{ mt: "2vh", width: "100%" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    s
                    label="Publish Date"
                    value={dateValue}
                    maxDate={Date.now()}
                    onChange={(newValue) => {
                      setDateValue(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
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
                            label={"Tags*"}
                            placeholder="Tags"
                            helperText={articleTagsError ? tagErrorText : ""}
                            id={articleTagsError ? "outlined-error" : ""}
                            error={articleTagsError}
                          />
                        );
                      }}
                    />
                  ) : (
                    <CircularProgress />
                  )}
                </FormControl>
              </Box>
              <Button onClick={() => setHowToOpen(true)}>
                How to use Tags
              </Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Box sx={{ mt: "2vh" }}>
                <Button type="submit" variant="contained" color="secondary">
                  Submit Paper
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
      <HowToUseTagsDialog open={howToOpen} setOpen={setHowToOpen} />
    </FormContainer>
  );
};

export default ArticleCreateForm;
