import React from "react";
import FormContainer from "./Components/FormContainer";
import { Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import store from "./Store";
import "./App.css";

export const history = createBrowserHistory();

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route exact path="/" component={FormContainer} />
      </Router>
    </Provider>
  );
}

export default App;
