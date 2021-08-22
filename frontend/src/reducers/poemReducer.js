import {
  POEM_LIST_FAIL,
  POEM_LIST_REQUEST,
  POEM_LIST_SUCCESS,
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
