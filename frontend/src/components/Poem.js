import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import classes from "./Poem.module.css";

const Poem = ({ poem }) => {
  let content = poem.text;
  if (poem.text.length > 400) {
    content = content.substring(0, 400) + "...";
  }
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <Link to={`/poem/${poem.id}`} className={classes.title}>
          {poem.title}
        </Link>
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
        <Link to={`/poem/${poem.id}`} className={classes.readOn}>
          Read On
        </Link>
      </div>
    </div>
  );
};
export default Poem;
