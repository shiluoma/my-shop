import { combineReducers } from "redux";
import user from "./user";
import resume from "./resume";
import common from "./common";

export default combineReducers({
  user,
  resume,
  common
})
