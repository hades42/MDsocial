import React, { useState } from "react";
import MarkdownEditor from "../components/MarkdownEditor";
import { useDispatch, useSelector } from "react-redux";
import classes from "./SinglePoem.module.css";
import ReactMarkdown from "react-markdown";
import { useEffect } from "react";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";
import { filterDate } from "../utils/tools";
import {
  getSinglePoem,
  upVoteSinglePoem,
  downVoteSinglePoem,
} from "../actions/poemActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

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
  const [previewMarkdown, setPreviewMarkdown] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSinglePoem(poemId));
  }, [poemId, dispatch]);

  const singlePoem = useSelector((state) => state.singlePoem);
  const { loading, error, poem } = singlePoem;

  const singleVotes = useSelector((state) => state.singleVotes);
  const { votes, error: errorVote } = singleVotes;

  const [text, setText] = useState(poem.text);

  const upVoteHandler = () => {
    dispatch(upVoteSinglePoem(poemId));
  };
  const downVoteHandler = () => {
    dispatch(downVoteSinglePoem(poemId));
  };
  if (errorVote) {
    alert(errorVote);
  }

  const previewHandler = () => {
    setPreviewMarkdown((prevState) => !prevState);
  };
  const onChange = (value) => {
    setText(value);
  };

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className={classes.space}></div>
          <button className={classes.previewBtn} onClick={previewHandler}>
            Preview
          </button>
          {previewMarkdown ? (
            <div className={classes.editor}>
              <MarkdownEditor
                text={poem.text}
                onChange={onChange}
              ></MarkdownEditor>
            </div>
          ) : (
            <div className={classes.wrapper}>
              <div className={classes.container}>
                <div className={classes.vote}>
                  <div onClick={upVoteHandler} className={classes.upVote}>
                    <i className="fas fa-chevron-up"></i>
                  </div>
                  <p>{votes}</p>
                  <div onClick={downVoteHandler} className={classes.downVote}>
                    <i className="fas fa-chevron-down"></i>
                  </div>
                </div>

                <div className={classes.heading}>
                  <h3 className={classes.title}>{poem.title}</h3>
                  <div className={classes.author}>
                    <p>
                      By {poem.author} / {filterDate(poem.createdAt)}
                    </p>
                  </div>
                  {poem.title ? (
                    <div className={classes.coverLetter}>{poem.title[0]}</div>
                  ) : (
                    ""
                  )}
                </div>
                <div className={classes.main}>
                  <ReactMarkdown
                    components={components}
                    remarkPlugins={[remarkGfm]}
                    children={poem.text}
                    className={classes.content}
                  ></ReactMarkdown>
                </div>
                <div className={classes.footer}>
                  <button onClick={upVoteHandler} className={classes.voteBtn}>
                    Vote
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SinglePoem;
