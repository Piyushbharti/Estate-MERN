import {IsLoadingClicked , userData} from "./userReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  IsLoadingClicked,
  userData
});

export default rootReducer;
