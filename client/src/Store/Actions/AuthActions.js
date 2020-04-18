import * as actionTypes from "../Types";
import {
  uiStartLoading,
  uiStopLoading,
  setError,
  removeError,
} from "./UiActions";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { history } from "../../App";

export const login = (mobile, otp) => {
  return (dispatch) => {
    dispatch(uiStartLoading());
    dispatch(removeError());
    axios
      .post("auth/validate", {
        mobile,
        otp,
      })
      .then((res) => {
        dispatch(uiStopLoading());
        if (!res.data.success) {
          dispatch(setError(res.data.msg));
        } else {
          const { token } = res.data;
          localStorage.setItem("jwtToken", token);
          const decoded = jwt_decode(token);
          dispatch(setCurrentUser(decoded));
          history.push("/");
        }
      })
      .catch((err) => {
        dispatch(setError("Something went wrong"));
        dispatch(uiStopLoading());
      });
  };
};

export const generateOtp = (mobile, resend = false) => {
  return (dispatch) => {
    dispatch(removeError());
    dispatch(uiStartLoading());
    axios
      .post("auth/generateOtp", { mobile })
      .then((res) => {
        dispatch(uiStopLoading());
        if (!res.data.success) {
          dispatch(setError(res.data.msg));
        } else {
          if (!resend) {
            history.push({
              pathname: "/validate",
              state: { mobile: mobile },
            });
          }
        }
      })
      .catch((err) => {
        dispatch(setError("Something went wrong"));
        dispatch(uiStopLoading());
      });
  };
};

export const setCurrentUser = (token) => {
  return {
    type: actionTypes.SET_USER,
    payload: token,
  };
};

export const logoutUser = () => (dispatch) => {
  // remove from local
  localStorage.removeItem("jwtToken");
  // remove auth header
  dispatch({
    type: actionTypes.LOGOUT,
  });
};
