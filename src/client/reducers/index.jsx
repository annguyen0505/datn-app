import { combineReducers } from "redux";
import homeReducer from "./../screens/home/reducers/index";
import authenticationReducer from "./../screens/authencation/reducers";
const checkBox = (store, action) => {
  if (action.type === "TOGGLE_CHECK") {
    return {
      checked: !store.checked
    };
  }

  return store || { checked: false };
};

const number = (store, action) => {
  if (action.type === "INC_NUMBER") {
    return {
      value: store.value + 1
    };
  } else if (action.type === "DEC_NUMBER") {
    return {
      value: store.value - 1
    };
  }

  return store || { value: 0 };
};

export default combineReducers({
  checkBox,
  number,
  homeReducer,
  authenticationReducer
});
