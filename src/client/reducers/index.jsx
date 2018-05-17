import { combineReducers } from "redux";
import homeReducer from "./../screens/home/reducers/index";
import authenticationReducer from "./../screens/authencation/reducers";
import shopViewReducer from "./../screens/shop-view/reducers";
import notificationReducers from "./../../client/screens/root-component/reducers/notificatiion";
import productReducer from "./../../client/screens/shop-management/reducers/productReducer";
import cartManagementReducer from "./../../client/screens/cart-management/reducers/index";
import registerReducer from "./../../client/screens/register/reducers";
import orderReducer from "./../../client/screens/shop-management/reducers/orderReducer";
export default combineReducers({
  homeReducer,
  authenticationReducer,
  shopViewReducer,
  notificationReducers,
  productReducer,
  cartManagementReducer,
  registerReducer,
  orderReducer
});
