import { combineReducers } from "redux";
import homeReducer from "./../screens/home/reducers/index";
import authenticationReducer from "./../screens/authencation/reducers";
import shopViewReducer from "./../screens/shop-view/reducers";
import notificationReducers from "./../../client/screens/root-component/reducers/notificatiion";

export default combineReducers({
  homeReducer,
  authenticationReducer,
  shopViewReducer,
  notificationReducers
});
