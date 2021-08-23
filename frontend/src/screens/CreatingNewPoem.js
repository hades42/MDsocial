import React, { useEffect, useState } from "react";
import classes from "./CreatingNewPoem.module.css";
import MarkdownEditor from "../components/MarkdownEditor";
import { useDispatch, useSelector } from "react-redux";
import { addNewPoem } from "../actions/poemActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
const CreatingNewPoem = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const onChange = (value) => {
    setText(value);
  };
  const dispatch = useDispatch();

  const addPoem = useSelector((state) => state.addPoem);
  const { loading, error, data } = addPoem;

  useEffect(() => {
    if (data) {
      if (!error) {
        setTitle("");
        setAuthor("");
        setText("");
      }
    }
  }, [data, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      title,
      author,
      text,
    };
    dispatch(addNewPoem(formData));
  };
  return (
    <>
      {loading && <Loader></Loader>}
      {error && <Message variant="danger">{error}</Message>}
      {data && <Message variant="success">{data.message}</Message>}
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
    </>
  );
};

export default CreatingNewPoem;
