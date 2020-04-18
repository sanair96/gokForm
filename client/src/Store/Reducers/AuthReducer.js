import * as actionTypes from "../Types";

const initialstate = {
  isAuthenticated: false,
  mobile: null,
};

export default function (state = initialstate, action) {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        mobile: action.payload.mobile,
      };
    case actionTypes.LOGOUT:
      return {
        isAuthenticated: false,
        mobile: null,
      };
    default:
      return state;
  }
}
