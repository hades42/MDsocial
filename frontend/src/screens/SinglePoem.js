import React, { useState } from "react";
import MarkdownEditor from "../components/MarkdownEditor";
import { useDispatch, useSelector } from "react-redux";
import classes from "./SinglePoem.module.css";
import ReactMarkdown from "react-markdown";
import { useEffect } from "react";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  getSinglePoem,
  upVoteSinglePoem,
  downVoteSinglePoem,
} from "../actions/poemActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Comment from "../components/Comment";

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

  const upVote = useSelector((state) => state.upVotePoem);
  const { votes: upVoteData, error: errorUpVote } = upVote;

  const downVote = useSelector((state) => state.downVotePoem);
  const { votes: downVoteData, error: errorDownVote } = downVote;
  // eslint-disable-next-line
  const [text, setText] = useState("");
  const [toggleComment, setToggleComment] = useState(false);

  const upVoteHandler = () => {
    dispatch(upVoteSinglePoem(poemId));
  };
  const downVoteHandler = () => {
    dispatch(downVoteSinglePoem(poemId));
  };
  if (errorUpVote || errorDownVote) {
    alert(errorUpVote || errorDownVote);
  }

  const previewHandler = () => {
    setPreviewMarkdown((prevState) => !prevState);
  };
  const onChange = (value) => {
    setText(value);
  };

  const toggleCommentBox = () => {
    setToggleComment((prevState) => !prevState);
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
          {previewMarkdown ? (
            <>
              <button className={classes.previewBtn2} onClick={previewHandler}>
                Preview
              </button>
              <div className={classes.editor}>
                <MarkdownEditor
                  text={poem.text}
                  onChange={onChange}
                ></MarkdownEditor>
              </div>
            </>
          ) : (
            <>
              <button className={classes.previewBtn} onClick={previewHandler}>
                Preview
              </button>
              <div className={classes.wrapper}>
                <div className={classes.container}>
                  <div className={classes.vote}>
                    <div onClick={upVoteHandler} className={classes.upVote}>
                      <i className="fas fa-chevron-up"></i>
                    </div>
                    <p>{upVoteData}</p>
                    <p>{downVoteData ? +downVoteData * -1 : 0}</p>
                    <div onClick={downVoteHandler} className={classes.downVote}>
                      <i className="fas fa-chevron-down"></i>
                    </div>
                  </div>

                  <div className={classes.heading}>
                    <h3 className={classes.title}>{poem.title}</h3>
                    <div className={classes.author}>
                      <p>
                        By {poem.author} / {poem.createdAt}
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
                    <div className={classes.btnContainer}>
                      <button
                        onClick={upVoteHandler}
                        className={classes.voteBtn}
                      >
                        Up Vote
                      </button>
                      <button
                        onClick={downVoteHandler}
                        className={classes.voteBtn}
                      >
                        Down Vote
                      </button>
                      <button
                        onClick={toggleCommentBox}
                        className={classes.voteBtn + " " + classes.fixing}
                      >
                        Comment
                      </button>
                    </div>
                    {toggleComment ? (
                      <Comment poemData={poem} poemId={poemId}></Comment>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default SinglePoem;
