import {
  ADD_POEM_FAIL,
  ADD_POEM_REQUEST,
  ADD_POEM_RESET,
  ADD_POEM_SUCCESS,
  POEM_CREATE_COMMENT_FAIL,
  POEM_CREATE_COMMENT_REQUEST,
  POEM_CREATE_COMMENT_RESET,
  POEM_CREATE_COMMENT_SUCCESS,
  POEM_LIST_FAIL,
  POEM_LIST_REQUEST,
  POEM_LIST_SUCCESS,
  SINGLE_POEM_DOWNVOTES_FAIL,
  SINGLE_POEM_FAIL,
  SINGLE_POEM_REQUEST,
  SINGLE_POEM_SUCCESS,
  SINGLE_POEM_UPVOTES_FAIL,
  SINGLE_POEM_VOTES,
  SINGLE_POEM_VOTES_RESET,
} from "../constants/poemConstant";

export const poemListReducer = (state = { poems: [] }, action) => {
  switch (action.type) {
    case POEM_LIST_REQUEST:
      return { loading: true, poems: [] };
    case POEM_LIST_SUCCESS:
      return { loading: false, poems: action.payload };
    case POEM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const singlePoemReducer = (state = { poem: {} }, action) => {
  switch (action.type) {
    case SINGLE_POEM_REQUEST:
      return { loading: true, poem: {} };
    case SINGLE_POEM_SUCCESS:
      return { loading: false, poem: action.payload };
    case SINGLE_POEM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSinglePoemVotes = (state = {}, action) => {
  switch (action.type) {
    case SINGLE_POEM_VOTES:
      return { votes: action.payload };
    case SINGLE_POEM_UPVOTES_FAIL:
      return { error: action.payload };
    case SINGLE_POEM_DOWNVOTES_FAIL:
      return { error: action.payload };
    case SINGLE_POEM_VOTES_RESET:
      return {};
    default:
      return state;
  }
};

export const addNewPoemReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_POEM_REQUEST:
      return { loading: true };
    case ADD_POEM_SUCCESS:
      return { loading: false, data: action.payload };
    case ADD_POEM_FAIL:
      return { loading: false, error: action.payload };
    case ADD_POEM_RESET:
      return {};
    default:
      return state;
  }
};

export const addNewCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case POEM_CREATE_COMMENT_REQUEST:
      return { loading: true };
    case POEM_CREATE_COMMENT_SUCCESS:
      return { loading: false, success: true };
    case POEM_CREATE_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    case POEM_CREATE_COMMENT_RESET:
      return {};
    default:
      return state;
  }
};
