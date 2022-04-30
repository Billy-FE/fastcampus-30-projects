import { combineReducers } from "redux";
import channelReducer from "./channelReducer";
import themeReducer from "./themeReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  channel: channelReducer,
  theme: themeReducer,
});

export default rootReducer;
