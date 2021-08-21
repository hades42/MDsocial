import React from "react";
import ReactMarkdown from "react-markdown";
import classes from "./Poem.module.css";

const Poem = ({ poem }) => {
  let content = poem.text;
  if (poem.text.length > 400) {
    content = content.substring(0, 400) + "...";
  }
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h2 className={classes.title}>{poem.title}</h2>
        <div className={classes.author}>
          <p>By {poem.author}</p>
        </div>
        <div className={classes.coverLetter}>{poem.title[0]}</div>
      </div>
      <div className={classes.main}>
        <div className={classes.vote}>
          <div className={classes.upVote}>
            <i className="fas fa-chevron-up"></i>
          </div>
          <p>{poem.votes}</p>
          <div className={classes.downVote}>
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
        <ReactMarkdown
          children={content}
          className={classes.content}
        ></ReactMarkdown>
      </div>
      <div className={classes.footer}>
        <button className={classes.readOn}>Read On</button>
      </div>
    </div>
  );
};
export default Poem;
