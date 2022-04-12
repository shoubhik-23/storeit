import { combineReducers } from "redux";
import { homeReducer } from "../containers/home/reducer";
import { loginReducer } from "../containers/login/reducer";

const rootReducer = combineReducers({
  home: homeReducer,
  profile: loginReducer,
});

export default rootReducer;
