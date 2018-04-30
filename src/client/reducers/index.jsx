import { combineReducers } from "redux";
import homeReducer from "./../screens/home/reducers/index";
import authenticationReducer from "./../screens/authencation/reducers";
import shopViewReducer from "./../screens/shop-view/reducers";


export default combineReducers({
  homeReducer,
  authenticationReducer,
  shopViewReducer
});
