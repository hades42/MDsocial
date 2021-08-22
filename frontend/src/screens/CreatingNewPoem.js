import React, { useState } from "react";
import axios from "axios";
import classes from "./CreatingNewPoem.module.css";
import MarkdownEditor from "../components/MarkdownEditor";
const CreatingNewPoem = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const onChange = (value) => {
    setText(value);
  };
  const submitData = async (formData) => {
    const config = {
      headers: {
        bob: "Bobalooba",
      },
    };
    const { data } = await axios.post(
      `https://shielded-spire-87442.herokuapp.com/api/poems`,
      formData,
      config
    );
    console.log(data);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      title,
      author,
      text,
    };
    submitData(formData);
    setTitle("");
    setAuthor("");
    setText("");
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.box}>
        <div className={classes.title}>
          <label htmlFor="title">Title of poem</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
          ></input>
        </div>
        <div className={classes.author}>
          <label htmlFor="author">Your name</label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            type="text"
            id="author"
          ></input>
        </div>
        <button type="submit" className={classes.submit}>
          Submit
        </button>
      </div>
      <MarkdownEditor text={text} onChange={onChange}></MarkdownEditor>
    </form>
  );
};

export default CreatingNewPoem;
