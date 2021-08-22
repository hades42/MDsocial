import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Poem from "./Poem";
import axios from "axios";
import classes from "./MainSection.module.css";
import { listPoems } from "../actions/poemActions";
import Loader from "./Loader";
import Message from "./Message";

const MainSection = () => {
  const dispatch = useDispatch();
  const poemList = useSelector((state) => state.poemList);
  const { loading, error, poems } = poemList;

  useEffect(() => {
    dispatch(listPoems());
  }, [dispatch]);

  const listPoem = [];

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h3>Latest stories</h3>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className={classes.content}>
          {poems.map((p) => (
            <Poem key={p.id} poem={p}></Poem>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainSection;
