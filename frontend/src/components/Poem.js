import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import classes from "./Poem.module.css";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";
import Message from "./Message";

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

  const [currentVote, setCurrentVote] = useState(poem.votes);
  const [error, setError] = useState("");
  const upVoteHandler = () => {
    const upVote = async () => {
      try {
        const config = {
          headers: {
            bob: "Bobalooba",
          },
        };
        const { data } = await axios.put(
          `/api/poems/${poem.id}/upvote`,
          {},
          config
        );
        setCurrentVote(data.votes);
      } catch (error) {
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
      }
    };
    upVote();
  };

  const downVoteHandler = () => {
    const downVote = async () => {
      try {
        const config = {
          headers: {
            bob: "Bobalooba",
          },
        };
        const { data } = await axios.put(
          `/api/poems/${poem.id}/devote`,
          {},
          config
        );
        setCurrentVote(data.votes);
      } catch (error) {
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
      }
    };
    downVote();
  };
  const filterData = (date) => {
    return date.substring(0, 10);
  };
  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <Link to={`/poems/${poem.id}`} className={classes.title}>
          {poem.title}
        </Link>
        <div className={classes.author}>
          <p>
            By {poem.author} / {filterData(poem.createdAt)}
          </p>
        </div>
        <div className={classes.coverLetter}>{poem.title[0]}</div>
      </div>
      <div className={classes.main}>
        <div className={classes.vote}>
          <div onClick={upVoteHandler} className={classes.upVote}>
            <i className="fas fa-chevron-up"></i>
          </div>
          <p>{currentVote}</p>
          <div onClick={downVoteHandler} className={classes.downVote}>
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
      {error && <Message variant="danger">{error}</Message>}
    </div>
  );
};
export default Poem;
