import React from "react";
import {
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
} from "@mui/material";
const HowToUseTagsDialog = ({ open, setOpen }) => {
  return (
    <Dialog
      fullWidth
      maxWidth={"md"}
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogContent>
        <Typography variant="h5" sx={{ mb: ".5vh" }}>
          Tags
        </Typography>
        <Typography sx={{ mb: "2vh" }}>
          A tag represents an area of academic research. They are used to
          describe papers and highlight your knowledge about a subject.
        </Typography>
        <Typography sx={{ mb: ".5h" }}>
          <b>Adding new Tags</b>
        </Typography>
        <Typography sx={{ mb: "2vh" }}>
          When selecting which tags, choose the most specific ones possible.
          Using a tag like Biology should be reserved for papers about very
          general topics.
        </Typography>
        <Typography sx={{ mb: "2vh" }}>
          If you don’t see a tag matching the topic you’re looking for after
          typing the tag name, select the ‘Add A Tag’ button. Then, you can put
          the tag name along with the corresponding Discipline and, once added,
          you will be able to attach it to the paper.
        </Typography>
        <Typography>
          <ul>
            <li>
              Capitalize each word, EXCEPT for prepositions and articles (of,
              the, and, etc.).
            </li>
            <li>Use a space to separate multiple words.</li>
            <li>
              Topics can be broad (e.g. Psychology, Electronic Engineering,
              etc.) or niche (e.g. Biotechnology, Reinforcement Learning,
              Contract Law).
            </li>
          </ul>
        </Typography>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            variant="contained"
            color="error"
          >
            Close
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default HowToUseTagsDialog;
