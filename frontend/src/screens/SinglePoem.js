import React from "react";
import axios from "axios";
import classes from "./SinglePoem.module.css";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";

const SinglePoem = ({ match }) => {
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
  const poemId = match.params.id;
  const [singlePoem, setSinglePoem] = useState({});
  const [currentVote, setCurrentVote] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          bob: "Bobalooba",
        },
      };
      const { data } = await axios.get(`/api/poems/${poemId}`, config);
      console.log(data);
      setSinglePoem(data);
      setCurrentVote(data.votes);
    };
    fetchData();
  }, [poemId]);

  const upVote = async () => {
    const config = {
      headers: {
        bob: "Bobalooba",
      },
    };
    const { data } = await axios.post(
      `https://shielded-spire-87442.herokuapp.com/api/poems/${poemId}`,
      {},
      config
    );
    setCurrentVote(data.votes);
  };
  const upVoteHandler = () => {
    upVote();
  };

  return (
    <>
      <div className={classes.space}></div>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.vote}>
            <div onClick={upVoteHandler} className={classes.upVote}>
              <i className="fas fa-chevron-up"></i>
            </div>
            <p>{currentVote}</p>
            <div className={classes.downVote}>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>

          <div className={classes.heading}>
            <h3 to={`/poem/${singlePoem.id}`} className={classes.title}>
              {singlePoem.title}
            </h3>
            <div className={classes.author}>
              <p>By {singlePoem.author}</p>
            </div>
            {singlePoem.title ? (
              <div className={classes.coverLetter}>{singlePoem.title[0]}</div>
            ) : (
              ""
            )}
          </div>
          <div className={classes.main}>
            <ReactMarkdown
              components={components}
              remarkPlugins={[remarkGfm]}
              children={singlePoem.text}
              className={classes.content}
            ></ReactMarkdown>
          </div>
          <div className={classes.footer}>
            <button className={classes.voteBtn}>Vote</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePoem;
