import { createBrowserHistory } from "history";
import jwt_decode from "jwt-decode";
import React from "react";
import { Provider } from "react-redux";
import { Route, Router } from "react-router-dom";
import "./App.css";
import AvailableForms from "./Components/AvailableForms";
import FormContainer from "./Components/FormContainer";
import HeatMapForm from './Components/heatmapForm';
import Login from "./Components/Login";
import PrivateRoute from "./Components/PrivateRoute";
import ValidateOtp from "./Components/ValidateOtp";
import store from "./Store";
import { logoutUser, setCurrentUser } from "./Store/Actions/AuthActions";

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
        <PrivateRoute exact path="/newgokform">
          <AvailableForms />
        </PrivateRoute>
        <PrivateRoute exact path="/newgokform/individualdata" component={FormContainer} />
        <PrivateRoute exact path='/newgokform/groupdata' component={HeatMapForm}/>
        <Route exact path="/newgokform/login" component={Login} />
        <Route exact path="/newgokform/validate" component={ValidateOtp} />
      </Router>
    </Provider>
  );
}

export default App;
