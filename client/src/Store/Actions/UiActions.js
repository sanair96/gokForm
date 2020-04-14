import * as actionTypes from "../Types";

export const uiStartLoading = () => {
  return {
    type: actionTypes.UI_START_LOADING,
  };
};
export const uiStopLoading = () => {
  return {
    type: actionTypes.UI_STOP_LOADING,
  };
};

export const setError = (message) => {
  return {
    type: actionTypes.SET_ERROR,
    payload: message,
  };
};

export const removeError = () => {
  return {
    type: actionTypes.REMOVE_ERROR,
  };
};
