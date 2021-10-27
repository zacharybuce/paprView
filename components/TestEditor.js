import { useEffect, useState } from "react";
import "braft-editor/dist/index.css";
import Head from "next/head";
import { Button, Container } from "@mui/material";
import Box from "@mui/material/Box";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";

let BraftEditor = () => <p>Loading...</p>;
const MyEditor = (props) => {
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
      article: "",
      upvotes: "0",
      downvotes: "0",
      lastedit: String(new Date()),
    },
  };

  const article = {
    method: "PUT",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: {
      id: "",
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
    summary.body.article = props.articleId;
    summary.body.content = String(editorState.toHTML());
    summary.body = JSON.stringify(summary.body);

    try {
      const res = await fetch("/api/summaries", summary);
      const data = await res.json();

      console.log(data);

      article.body.id = data.data._id;
      article.body = JSON.stringify(article.body);
      const putRes = await fetch("api/articles/" + data.data.article, article);

      const putData = await putRes.json();

      console.log(putData);

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