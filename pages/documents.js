import React from "react";
import { Box, CircularProgress } from "@mui/material";
import fetch from "isomorphic-unfetch";
import Document from "../components/Document";

const documents = (props) => {
  if (!documents)
    return (
      <Box sx={{ mt: "2vh", mr: "10vw", ml: "10vw", textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <div>
      {props.documents.map((doc) => {
        return <Document doc={doc} />;
      })}
    </div>
  );
};

export default documents;

export async function getServerSideProps(context) {
  try {
    const res = await fetch(
      process.env.ROOT_URL + "/api/search/" + context.query.s,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    const documents = data.data;

    return {
      props: { documents: documents },
    };
  } catch (error) {
    console.log(error);
  }
}
