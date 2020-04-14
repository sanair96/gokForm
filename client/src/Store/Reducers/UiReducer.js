import * as actionTypes from "../Types";

const initialState = {
  isLoading: false,
  error: false,
  errorMessage: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UI_START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.UI_STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
      };
    case actionTypes.REMOVE_ERROR:
      return {
        ...state,
        error: false,
        errorMessage: null,
      };
    default:
      return state;
  }
};

export default reducer;
