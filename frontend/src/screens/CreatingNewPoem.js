import axios from "axios";
import React, { useEffect, useState } from "react";
import classes from "./CreatingNewPoem.module.css";
import MarkdownEditor from "../components/MarkdownEditor";
import { useDispatch, useSelector } from "react-redux";
import { addNewPoem } from "../actions/poemActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ADD_POEM_RESET } from "../constants/poemConstant";

const CreatingNewPoem = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [uploading, setUploading] = useState(false);

  const onChange = (value) => {
    setText(value);
  };
  const dispatch = useDispatch();

  const addPoem = useSelector((state) => state.addPoem);
  const { loading, error, data } = addPoem;

  useEffect(() => {
    dispatch({ type: ADD_POEM_RESET });
  }, []);

  useEffect(() => {
    if (data) {
      if (!error) {
        setTitle("");
        setAuthor("");
        setText("");
      }
    }
  }, [data, error, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      title,
      author,
      text,
    };
    dispatch(addNewPoem(formData));
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImageLink(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };
  const copyClibBoard = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(imageLink);
  };
  return (
    <>
      <form className={classes.form}>
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
          {uploading && <Loader></Loader>}
          <button
            type="submit"
            name="submitBtn"
            className={classes.submit}
            onClick={submitHandler}
          >
            Submit
          </button>
        </div>
        <div className={classes.secondRow}>
          <div className={classes.upload}>
            <label htmlFor="myfile">Upload your Image: </label>
            <input
              className="form-control"
              type="file"
              id="myfile"
              name="myfile"
              onChange={uploadFileHandler}
              aria-describedby="inputGroupFileAddon04"
              aria-label="Upload"
            />
          </div>
          <div className={classes.linkUpload}>
            <input
              className={classes.getLink}
              type="text"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
            ></input>
            <button className={classes.copy} onClick={copyClibBoard}>
              Copy
            </button>
          </div>
        </div>
        {loading && <Loader></Loader>}
        {error && <Message variant="danger">{error}</Message>}
        {data && <Message variant="success">{data.message}</Message>}
        <MarkdownEditor text={text} onChange={onChange}></MarkdownEditor>
      </form>
    </>
  );
};

export default CreatingNewPoem;
