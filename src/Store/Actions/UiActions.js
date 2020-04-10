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

export const setPasswordSuccess = () => {
  return {
    type: actionTypes.SET_PASSWORD_SUCCESS,
  };
};

export const removePasswordSuccess = () => {
  return {
    type: actionTypes.REMOVE_PASSWORD_SUCCESS,
  };
};
