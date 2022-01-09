import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import transferReducer from "./transferReducer";
 
export default combineReducers({
  authReducer,
  userReducer,
  transferReducer
});
