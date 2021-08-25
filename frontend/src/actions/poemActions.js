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
  POEM_CREATE_COMMENT_REQUEST,
  POEM_CREATE_COMMENT_SUCCESS,
  POEM_CREATE_COMMENT_FAIL,
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
    const config = {
      headers: {
        bob: "Bobalooba",
      },
    };
    const { data } = await axios.get("/api/poems", config);
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

    const config = {
      headers: {
        bob: "Bobalooba",
      },
    };
    const response = await axios.get(`/api/poems/${poemId}`, config);
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

export const upVoteSinglePoem = (poemId) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        bob: "Bobalooba",
        Authorization: `${userInfo ? `Bearer ${userInfo.token}` : null}`,
      },
    };

    const { data } = await axios.put(
      `/api/poems/${poemId}/upvote`,
      {
        userId: `${userInfo ? userInfo.id : ""}`,
      },
      config
    );
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

export const downVoteSinglePoem = (poemId) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        bob: "Bobalooba",
        Authorization: `${userInfo ? `Bearer ${userInfo.token}` : null}`,
      },
    };
    const { data } = await axios.put(
      `/api/poems/${poemId}/devote`,
      {
        userId: `${userInfo ? userInfo.id : ""}`,
      },
      config
    );
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

export const addNewPoem = (poemData) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({
      type: ADD_POEM_REQUEST,
    });
    const config = {
      headers: {
        bob: "Bobalooba",
        Authorization: `Bearer ${userInfo ? userInfo.token : ""}`,
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

export const createNewComment =
  (poemId, comment) => async (dispatch, getState) => {
    try {
      dispatch({
        type: POEM_CREATE_COMMENT_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/poems/${poemId}/comment`, comment, config);
      dispatch({
        type: POEM_CREATE_COMMENT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: POEM_CREATE_COMMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
