import axios from "axios";
import {
  POEM_LIST_REQUEST,
  POEM_LIST_SUCCESS,
  POEM_LIST_FAIL,
} from "../constants/poemConstant";

export const listPoems = () => async (dispatch) => {
  try {
    dispatch({ type: POEM_LIST_REQUEST });
    const { data } = await axios.get("/api/poems");
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
