import axios from "axios";
import {
  POEM_LIST_REQUEST,
  POEM_LIST_SUCCESS,
  POEM_LIST_FAIL,
  SINGLE_POEM_REQUEST,
  SINGLE_POEM_FAIL,
  SINGLE_POEM_SUCCESS,
  SINGLE_POEM_VOTES,
  SINGLE_POEM_UPVOTES_FAIL,
  SINGLE_POEM_DOWNVOTES_FAIL,
  ADD_POEM_REQUEST,
  ADD_POEM_SUCCESS,
  ADD_POEM_FAIL,
} from "../constants/poemConstant";

const filterDate = (date) => {
  return date.substring(0, 10);
};
const sortDate = (a, b) => {
  const dateA = new Date(a.createdAt).getTime();
  const dateB = new Date(b.createdAt).getTime();
  return dateB - dateA;
};

export const listPoems = () => async (dispatch) => {
  try {
    dispatch({ type: POEM_LIST_REQUEST });
    const { data } = await axios.get("/api/poems");
    data.sort(sortDate);
    dispatch({ type: POEM_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POEM_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSinglePoem = (poemId) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_POEM_REQUEST });
    const response = await axios.get(`/api/poems/${poemId}`);
    const data = response.data;
    const date = data.createdAt;
    data.createdAt = filterDate(date);
    dispatch({
      type: SINGLE_POEM_SUCCESS,
      payload: data,
    });
    dispatch({
      type: SINGLE_POEM_VOTES,
      payload: data.votes,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_POEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const upVoteSinglePoem = (poemId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        bob: "Bobalooba",
      },
    };
    const { data } = await axios.put(`/api/poems/${poemId}/upvote`, {}, config);
    dispatch({
      type: SINGLE_POEM_VOTES,
      payload: data.votes,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_POEM_UPVOTES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const downVoteSinglePoem = (poemId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        bob: "Bobalooba",
      },
    };
    const { data } = await axios.put(`/api/poems/${poemId}/devote`, {}, config);
    dispatch({
      type: SINGLE_POEM_VOTES,
      payload: data.votes,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_POEM_DOWNVOTES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addNewPoem = (poemData) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_POEM_REQUEST,
    });
    const config = {
      headers: {
        bob: "Bobalooba",
      },
    };
    const { data } = await axios.post(`/api/poems`, poemData, config);
    dispatch({
      type: ADD_POEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_POEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
