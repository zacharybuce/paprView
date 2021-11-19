import { useEffect, useState } from "react";
import "braft-editor/dist/index.css";
import Head from "next/head";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";

let BraftEditor = () => <p>Loading...</p>;
const MyEditor = (props) => {
  const router = useRouter();
  const [editorState, setEditorState] = useState("");
  const [outputHtml, setOutputHtml] = useState("");

  const controls = [
    "undo",
    "redo",
    "separator",
    "headings",
    "bold",
    "italic",
    "text-color",
    "separator",
    "superscript",
    "subscript",
    "separator",
    "text-indent",
    "text-align",
    "separator",
    "list-ul",
    "list-ol",
    "blockquote",
    "code",
    "separator",
  ];

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
      user: props.userId,
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

  const user = {
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

      const articleTags = [];

      for (const tag of putData.data.tags) {
        articleTags.push({ tag: tag, value: 0 });
      }

      user.body.id = data.data._id;
      user.body.articleTags = articleTags;
      user.body = JSON.stringify(user.body);
      const userPutRes = await fetch("api/users/" + props.userId, user);

      const userPutData = await userPutRes.json();

      router.push("/summaries/" + props.articleId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>My Editor</title>
      </Head>
      <Box sx={{ backgroundColor: "white", boxShadow: 3, borderRadius: "5px" }}>
        <BraftEditor
          language="en"
          value={editorState}
          controls={controls}
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
