import React, { useState, useEffect } from "react";
import { Col, ListGroup, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Comment.module.css";
import Message from "./Message";
import { createNewComment, getSinglePoem } from "../actions/poemActions";
import { POEM_CREATE_COMMENT_RESET } from "../constants/poemConstant";

const Comment = ({ poemId, poemData }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const addNewComment = useSelector((state) => state.addNewComment);
  const { error, success } = addNewComment;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (success) {
      alert("Comment Submitted!");
      setComment("");
      dispatch({ type: POEM_CREATE_COMMENT_RESET });
      dispatch(getSinglePoem(poemId));
    }
  }, [success, dispatch, poemId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createNewComment(poemData.id, {
        userId: userInfo.id,
        name: userInfo.name,
        text: comment,
      })
    );
  };
  return (
    <div className={classes.container}>
      <Col>
        <h2>Comments</h2>
        {poemData.comments.length === 0 && <Message>No Comments</Message>}
        <ListGroup classes={classes.commentBox}>
          {poemData.comments.map((comment) => (
            <ListGroup.Item key={comment.id}>
              <strong>{comment.name}</strong>
              <p>{comment.createdAt.substring(0, 10)}</p>
              <p>{comment.text}</p>
            </ListGroup.Item>
          ))}
          <ListGroup.Item>
            <h2>Write Your Comment</h2>
            {error && <Message variant="danger">{error}</Message>}
            {userInfo ? (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="comment">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={comment}
                    className={classes.textComment}
                    onChange={(e) => setComment(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <button type="submit" className={classes.submit}>
                  Submit
                </button>
              </Form>
            ) : (
              <Message>
                Please <Link to="/login">sign in</Link> to write comments
              </Message>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </div>
  );
};

export default Comment;
