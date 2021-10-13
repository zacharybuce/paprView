import { useEffect, useState } from "react";
import "braft-editor/dist/index.css";
import Head from "next/head";
import { Button, Container } from "@mui/material";
import Box from "@mui/material/Box";

let BraftEditor = () => <p>Loading...</p>;
const MyEditor = () => {
  const [editorState, setEditorState] = useState("");
  const [outputHtml, setOutputHtml] = useState("");

  useEffect(() => {
    //here window is available
    const initBraft = async () => {
      BraftEditor = (await import("braft-editor")).default;
      setEditorState(
        BraftEditor.createEditorState("<p>Hello <b>World!</b></p>")
      );
    };
    initBraft();
  }, []);

  const handleEditorChange = (value) => {
    setEditorState(value);
    setOutputHtml(value.toHTML());
  };

  const saveContent = () => {
    console.log(editorState.toHTML());
  };

  return (
    <>
      <Head>
        <title>My Editor</title>
      </Head>
      <Box
        sx={{
          display: { xs: "none", sm: "block" },
          mt: "5vh",
          mr: "10vw",
          ml: "10vw",
          mb: "2vh",
          boxShadow: 3,
          borderRadius: "5px",
        }}
      >
        <BraftEditor
          language="en"
          value={editorState}
          excludeControls={"media"}
          onChange={handleEditorChange}
        />
      </Box>
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
        }}
      >
        <BraftEditor
          language="en"
          value={editorState}
          excludeControls={["media", "fullscreen"]}
          onChange={handleEditorChange}
        />
      </Box>
      <Box sx={{ ml: "10vw" }}>
        <Button variant="contained" onClick={saveContent}>
          Submit your Summary
        </Button>
      </Box>
    </>
  );
};

export default MyEditor;
