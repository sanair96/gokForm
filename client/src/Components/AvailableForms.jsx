import React from "react";
import {
  Grid,
  List,
  ListItemText,
  ListItemIcon,
  ListItem,
  withStyles,
  AppBar,
  Button,
  Toolbar,
  Typography,
} from "@material-ui/core";

import { styles } from "./FormContainer";
import GroupIcon from "@material-ui/icons/Group";
import FaceIcon from "@material-ui/icons/Face";
import { logoutUser } from "../Store/Actions/AuthActions";
import { connect } from "react-redux";
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const AvailableForms = (props) => {
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
          <Button color="inherit" onClick={props.logoutUser}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Grid alignItems="center">
        <List>
          <ListItemLink href="/groupdata">
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText>Group Data collection</ListItemText>
          </ListItemLink>
          <ListItemLink href="/individualdata">
            <ListItemIcon>
              <FaceIcon />
            </ListItemIcon>
            <ListItemText>Individual Data collection</ListItemText>
          </ListItemLink>
        </List>
      </Grid>
    </>
  );
};

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
)(withStyles(styles)(AvailableForms));
