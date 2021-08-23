import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  getSinglePoemVotes,
  poemListReducer,
  singlePoemReducer,
} from "./reducers/poemReducer";

const reducer = combineReducers({
  poemList: poemListReducer,
  singlePoem: singlePoemReducer,
  singleVotes: getSinglePoemVotes,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;