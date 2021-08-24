import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  getSinglePoemVotes,
  poemListReducer,
  singlePoemReducer,
  addNewPoemReducer,
  addNewCommentReducer,
} from "./reducers/poemReducer";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  poemList: poemListReducer,
  singlePoem: singlePoemReducer,
  singleVotes: getSinglePoemVotes,
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
