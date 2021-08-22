import {
  POEM_LIST_FAIL,
  POEM_LIST_REQUEST,
  POEM_LIST_SUCCESS,
  SINGLE_POEM_DOWNVOTES,
  SINGLE_POEM_DOWNVOTES_FAIL,
  SINGLE_POEM_FAIL,
  SINGLE_POEM_REQUEST,
  SINGLE_POEM_SUCCESS,
  SINGLE_POEM_UPVOTES,
  SINGLE_POEM_UPVOTES_FAIL,
  SINGLE_POEM_VOTES,
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
    default:
      return {};
  }
};
