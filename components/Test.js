import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Grid } from "@mui/material";

const test = () => {
  const handleChangeText = (e) => {
    setText(e.target.value);
  };
  const addValue = () => {
    setValues([...values, ""]);
  };
  const handleValueChange = (index, e) => {
    const updatedValues = values.map((value, i) => {
      if (i === index) {
        return e.target.value;
      } else {
        return value;
      }
    });
    setValues(updatedValues);
  };
  const deleteValue = (jump) => {
    setValues(values.filter((j) => j !== jump));
  };

  return (
    <div>
      <TextField
        autoFocus
        margin="dense"
        value={props.text}
        onChange={handleChangeText}
        required
        label="Author"
        fullWidth
      />
      {props.values.map((jump, index) => (
        <Box key={"jump" + index}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item xs={10}>
              <TextField
                autoFocus
                margin="dense"
                label="Author"
                value={jump || ""}
                onChange={(e) => handleValueChange(index, e)}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <div
                className="font-icon-wrapper"
                onClick={() => deleteValue(jump)}
              >
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button onClick={addValue} color="primary">
        Add
      </Button>
    </div>
  );
};

export default test;
