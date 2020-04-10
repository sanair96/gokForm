import { combineReducers } from "redux";
import UiReducer from "./UiReducer";

export default combineReducers({
  ui: UiReducer,
});
