import React, { useState } from "react";
import Form from "./components/Form";
import "bulma/css/bulma.min.css";
import "./App.css";
import ThankYou from "./components/ThankYou";
import { connect } from "react-redux";
import {
  withStyles,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Link,
  Container,
} from "@material-ui/core";
import { logoutUser } from "../../Store/Actions/AuthActions";
import { styles } from "../FormContainer";

function App(props) {
  const [submitted, setSubmitted] = useState(false);
  const { classes } = props;
  return (
    <>
      <AppBar position="absolute" color="inherit" className={classes.appBar}>
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Link href="/">Home</Link>
          <Button color="inherit" onClick={props.logoutUser}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <div className="has-text-centered">
          <img src="LabourDept.jpg" alt="Labour Department" />
        </div>
        <h1 className="is-size-4 has-text-centered">Labours Heatmap Form</h1>
        {!submitted ? (
          <Form url={"/data/groupdata"} submitted={setSubmitted} />
        ) : (
          <ThankYou />
        )}
      </Container>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
