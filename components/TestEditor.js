import { useEffect, useState } from "react";
import "braft-editor/dist/index.css";
import Head from "next/head";
import { Button, Container } from "@mui/material";
import Box from "@mui/material/Box";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";

let BraftEditor = () => <p>Loading...</p>;
const MyEditor = () => {
  const router = useRouter();

  const [editorState, setEditorState] = useState("");
  const [outputHtml, setOutputHtml] = useState("");

  const summary = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: {
      content: "",
      article: "61683ff3a878e57a8f3625b9",
      upvotes: "0",
      downvotes: "0",
      lastedit: String(new Date()),
    },
  };

  useEffect(() => {
    //here window is available
    const initBraft = async () => {
      BraftEditor = (await import("braft-editor")).default;
      setEditorState(BraftEditor.createEditorState(null));
    };
    initBraft();
  }, []);

  const handleEditorChange = (value) => {
    setEditorState(value);
    setOutputHtml(value.toHTML());
  };

  const saveContent = async () => {
    summary.body.content = String(editorState.toHTML());
    summary.body = JSON.stringify(summary.body);
    console.log(summary);

    try {
      await fetch("/api/summaries", summary);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>My Editor</title>
      </Head>
      <Box sx={{ boxShadow: 3, borderRadius: "5px" }}>
        <BraftEditor
          language="en"
          value={editorState}
          excludeControls={"media"}
          onChange={handleEditorChange}
        />
      </Box>
      <Box sx={{ mt: "2vh" }}>
        <Button variant="contained" onClick={saveContent}>
          Submit your Summary
        </Button>
      </Box>
    </>
  );
};

export default MyEditor;
