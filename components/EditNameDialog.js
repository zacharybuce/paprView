import React from "react";
import {
  Box,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";

const EditNameDialog = ({ editing, setEditing, changeName, setNewName }) => {
  return (
    <Dialog
      data-testid="dialog"
      open={editing}
      onClose={() => setEditing(false)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogTitle>Edit your Name</DialogTitle>
      <Box component="container" sx={{ p: 1, textAlign: "center", mb: "2vh" }}>
        <Box sx={{ width: "60%", ml: "3vw" }}>
          <TextField
            variant="standard"
            onChange={(event) => setNewName(event.target.value)}
            label="Name"
            fullWidth
          ></TextField>
        </Box>
      </Box>
      <DialogActions>
        <Box sx={{ p: 1 }}>
          <Button onClick={() => changeName()}>Submit</Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EditNameDialog;
