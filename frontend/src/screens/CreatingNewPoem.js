import React, { useState } from "react";
import classes from "./CreatingNewPoem.module.css";
import MarkdownEditor from "../components/MarkdownEditor";
const CreatingNewPoem = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const onChange = (value) => {
    setText(value);
  };
  return (
    <form>
      <div className={classes.title}>
        <label htmlFor="title">Title of poem</label>
        <input value={title} onChange={setTitle} type="text" id="title"></input>
      </div>
      <div className={classes.author}>
        <label htmlFor="author">Title of poem</label>
        <input
          value={author}
          onChange={setAuthor}
          type="text"
          id="author"
        ></input>
      </div>
      <MarkdownEditor text={text} onChange={onChange}></MarkdownEditor>
    </form>
  );
};

export default CreatingNewPoem;
