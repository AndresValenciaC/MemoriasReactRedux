import { combineReducers } from "redux";

import postsReducer from "./postsReducer";

import authReducer from "./authReducer";

export const reducers = combineReducers({
  postsReducer,
  authReducer,
});
