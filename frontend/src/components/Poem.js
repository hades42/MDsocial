import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import classes from "./Poem.module.css";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";

const Poem = ({ poem }) => {
  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={nord}
          language={match[1]}
          PreTag="div"
          children={String(children).replace(/\n$/, "")}
          {...props}
        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };
  let content = poem.text;
  if (poem.text.length > 400) {
    content = content.substring(0, 400) + "...";
  }
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <Link to={`/poems/${poem.id}`} className={classes.title}>
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
          components={components}
          remarkPlugins={[remarkGfm]}
          children={content}
          className={classes.content}
        ></ReactMarkdown>
      </div>
      <div className={classes.footer}>
        <Link to={`/poems/${poem.id}`} className={classes.readOn}>
          Read On
        </Link>
      </div>
    </div>
  );
};
export default Poem;
