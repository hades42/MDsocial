import React from "react";
import axios from "axios";
import classes from "./SinglePoem.module.css";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";

const SinglePoem = ({ match }) => {
  const poemId = match.params.id;
  const [singlePoem, setSinglePoem] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          bob: "Bobalooba",
        },
      };
      const { data } = await axios.get(
        `https://shielded-spire-87442.herokuapp.com/api/poems/${poemId}`,
        config
      );
      console.log(data);
      setSinglePoem(data);
    };
    fetchData();
  }, [poemId]);

  return (
    <>
      <div className={classes.space}></div>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.vote}>
            <div className={classes.upVote}>
              <i className="fas fa-chevron-up"></i>
            </div>
            <p>{singlePoem.votes}</p>
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
