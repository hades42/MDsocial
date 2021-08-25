import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  poemListReducer,
  singlePoemReducer,
  addNewPoemReducer,
  addNewCommentReducer,
  upVotePoemReducer,
  downVotePoemReducer,
} from "./reducers/poemReducer";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  poemList: poemListReducer,
  singlePoem: singlePoemReducer,
  upVotePoem: upVotePoemReducer,
  downVotePoem: downVotePoemReducer,
  addPoem: addNewPoemReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  addNewComment: addNewCommentReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
