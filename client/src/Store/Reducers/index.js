import { combineReducers } from "redux";
import UiReducer from "./UiReducer";
import AuthReducer from "./AuthReducer";

export default combineReducers({
  ui: UiReducer,
  auth: AuthReducer,
});
