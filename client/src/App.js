import React from "react";
import FormContainer from "./Components/FormContainer";
import Login from "./Components/Login";
import ValidateOtp from "./Components/ValidateOtp";
import PrivateRoute from "./Components/PrivateRoute";
import { Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { setCurrentUser, logoutUser } from "./Store/Actions/AuthActions";
import jwt_decode from "jwt-decode";
import store from "./Store";
import "./App.css";

export const history = createBrowserHistory();

if (localStorage.jwtToken) {
  // decode and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user
  store.dispatch(setCurrentUser(decoded));
  // check for expired token time
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout
    store.dispatch(logoutUser());
    // redirect to login
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <PrivateRoute exact path="/" component={FormContainer} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/validate" component={ValidateOtp} />
      </Router>
    </Provider>
  );
}

export default App;
