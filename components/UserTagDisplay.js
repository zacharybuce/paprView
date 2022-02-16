import React from "react";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import DisciplineTagIcon from "./DisciplineTagIcon";

const UserTagDisplay = (props) => {
  const [tagName, setTagName] = useState(null);
  const [disName, setDisName] = useState(null);

  useEffect(() => {
    getTagName(props.tagId);
  }, []);
  const getTagName = async (tagId) => {
    try {
      var tagRes = await fetch(
        process.env.NEXT_PUBLIC_ROOT_URL + "/api/tags/" + tagId
      );
      const tagData = await tagRes.json();
      //console.log(tagData);
      setTagName(tagData.data.name);
      setDisName(tagData.data.disciplineName);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container sx={{ m: 1 }}>
      <Grid item xs={1}>
        <DisciplineTagIcon disciplineName={disName} />
      </Grid>
      <Grid item xs={7}>
        {tagName}
      </Grid>
      <Grid item xs={4}>
        {props.score}
      </Grid>
    </Grid>
  );
};

export default UserTagDisplay;
