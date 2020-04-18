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
import { login, generateOtp } from "../Store/Actions/AuthActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import OtpInput from "react-otp-input";
import { withRouter } from "react-router-dom";

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

class ValidateOtp extends React.Component {
  state = {
    otp: null,
    time: 60,
  };

  setOtp = (val) => {
    this.setState({
      otp: val,
    });
  };

  onSubmit = () => {
    const { otp } = this.state;
    if (!otp || otp.toString().length < 6) return;
    this.props.login(this.props.location.state.mobile, otp);
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((prevState) => {
        return {
          time: prevState.time - 1,
        };
      });
    }, 1000);
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
      return;
    }
    if (!this.props.location.state || !this.props.location.state.mobile) {
      this.props.history.push("/login");
      return;
    }
  }

  resendOtp = () => {
    if (this.state.time !== 0) return;
    const mobile = this.props.location.state.mobile;
    this.props.generateOtp(mobile, true);
    this.setState({ time: 60 });
    this.interval = setInterval(() => {
      this.setState((prevState) => {
        return {
          time: prevState.time - 1,
        };
      });
    }, 1000);
  };

  render() {
    if (this.state.time == 0) {
      clearInterval(this.interval);
    }
    const { otp } = this.state;
    const { classes, ui } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Enter Otp
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

          <OtpInput
            onChange={this.setOtp}
            numInputs={6}
            separator={<span>-</span>}
            containerStyle={{ marginTop: 20 }}
            inputStyle={{
              width: "3rem",
              height: "3rem",
              margin: "0 1rem",
              fontSize: "2rem",
              borderRadius: 4,
              border: "1px solid rgba(0,0,0,0.3)",
            }}
            shouldAutoFocus
            hasErrored={ui.error}
            value={otp}
            hasErrored={!otp || otp.toString().length < 6}
            errorStyle={{ border: "1px solid red" }}
          />
          {ui.isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onSubmit}
            >
              Submit Otp
            </Button>
          )}
          <Grid container>
            <Grid item xs>
              <Link href="/login" variant="body2">
                Login?
              </Link>
              <Grid item xs>
                {!ui.isLoading && (
                  <Button
                    style={{ marginLeft: 0, marginTop: 8 }}
                    onClick={this.resendOtp}
                  >
                    Resend Otp{" "}
                    {this.state.time !== 0 && `in ${this.state.time}`}
                  </Button>
                )}
              </Grid>
            </Grid>

            <Grid item></Grid>
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
    login: (mobile, otp) => dispatch(login(mobile, otp)),
    generateOtp: (mobile, resend) => dispatch(generateOtp(mobile, resend)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(ValidateOtp)));
