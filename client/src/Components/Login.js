import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { removeError } from "../Store/Actions/UiActions";
import { generateOtp } from "../Store/Actions/AuthActions";
import { isEmpty } from "../helpers";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Labour Institute (Govt. of Karnataka)
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    marginTop: theme.spacing(1),
  },
});

class Login extends React.Component {
  state = {
    mobile: {
      value: null,
    },
  };

  componentDidMount() {
    console.log(this.props, "auth");
    if (this.props.auth.isAuthenticated) this.props.history.push("/");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
      this.props.removeError();
    }
  }

  handleInputChange = (field, val) => {
    this.setState({
      [field]: {
        ...this.state[field],
        value: val,
      },
    });
  };

  login = () => {
    const { mobile } = this.state;
    if (isEmpty(mobile.value) || !mobile.value.match("^[0-9]{10}$")) {
      return;
    }
    this.props.generateOtp(mobile.value);
  };

  render() {
    const { mobile } = this.state;
    const { classes, ui } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          {/* <form className={classes.form} noValidate > */}
          {ui.error && (
            <Collapse in={ui.error} className="alert">
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={this.props.removeError}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {ui.errorMessage || "Something Went Wrong"}
              </Alert>
            </Collapse>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="mobile"
            label="Mobile No"
            name="mobile"
            autoComplete="mobile"
            autoFocus
            error={isEmpty(mobile.value) || !mobile.value.match("^[0-9]{10}$")}
            helperText="Required Field"
            onChange={(event) =>
              this.handleInputChange("mobile", event.target.value)
            }
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          {ui.isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.login}
            >
              Login
            </Button>
          )}
          <Grid container>
            <Grid item>
              {/* <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link> */}
            </Grid>
          </Grid>
          {/* </form> */}
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeError: () => dispatch(removeError()),
    generateOtp: (mobile) => dispatch(generateOtp(mobile)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login));
