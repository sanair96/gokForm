import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import Logo from "../images/LabourDept.jpg";
import Form1 from "./Form1";
import Form2 from "./Form2";
import { isEmpty } from "../helpers";
import axios from "axios";
import {
  setError,
  removeError,
  uiStartLoading,
  uiStopLoading,
} from "../Store/Actions/UiActions";
import { CircularProgress } from "@material-ui/core";

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
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
});

const steps = ["Select Category", "Add Information"];

const typeMap = [
  "RELIEF CAMPS/SHELTER (Dist wise)",
  "EMPLOYERS WHOSE LABOUR IS IN-SITU",
  "LOCALITIES WHERE MIGRANT WORKERS ARE CLUSTERED",
];

function getStepContent(step, data, handleInputChange, onFocus) {
  switch (step) {
    case 0:
      return (
        <Form1
          data={data[0]}
          handleInputChange={handleInputChange}
          setFocus={onFocus}
        />
      );
    case 1:
      return (
        <Form2
          data={data[1]}
          handleInputChange={handleInputChange}
          setFocus={onFocus}
        />
      );
    default:
      throw new Error("Unknown step");
  }
}

class FormContainer extends Component {
  state = {
    activeStep: 0,
    type: {
      value: 0,
    },
    state: {
      value: "Andaman Nicobar",
      focused: false,
    },
    district: {
      value: "",
      focused: false,
    },
    campName: {
      value: "",
      focused: false,
    },
    runBy: {
      value: "Govt",
      focused: false,
    },
    facilities: {
      value: "",
      focused: false,
    },
    employerName: {
      value: "",
      focused: false,
    },
    sector: {
      value: "Building and Construction",
      focused: false,
    },
    otherSector: {
      value: "",
      focused: false,
    },
    locality: {
      value: "",
      focused: false,
    },
    address: {
      value: "",
      focused: false,
    },
    name: {
      value: "",
      focused: false,
    },
    age: {
      value: "",
      focused: false,
    },
    gender: {
      value: "M",
      focused: false,
    },
    occupation: {
      value: "Agriculture",
      focused: false,
    },
    otherOccupation: {
      value: "",
      focused: false,
    },
    mobile: {
      value: "",
      focused: false,
    },
    lastAddress: {
      value: "",
      focused: false,
    },
    nativeDistrict: {
      value: "",
      focused: false,
    },
    nativeState: {
      value: "Andaman Nicobar",
      focused: false,
    },
    haveBank: {
      value: "N",
      focused: false,
    },
    haveJandhan: {
      value: "N",
      focused: false,
    },
    accNo: {
      value: "",
      focused: false,
    },
    ifsc: {
      value: "",
      focused: false,
    },
    ujjwala: {
      value: "N",
      focused: false,
    },
    aadhaar: {
      value: "",
      focused: false,
    },
    success: false,
  };

  removeSuccess = () => {
    this.setState({
      success: false,
    });
  };

  handleSubmit = () => {
    console.log("submit");
    const {
      type,
      state,
      district,
      campName,
      runBy,
      facilities,
      employerName,
      sector,
      otherSector,
      locality,
      address,
      name,
      age,
      gender,
      occupation,
      otherOccupation,
      mobile,
      lastAddress,
      nativeDistrict,
      nativeState,
      haveBank,
      haveJandhan,
      accNo,
      ifsc,
      ujjwala,
      aadhaar,
    } = this.state;
    if (
      isEmpty(name.value) ||
      isEmpty(age.value) ||
      isNaN(age.value) ||
      isEmpty(mobile.value) ||
      !mobile.value.match("^[0-9]{10}$") ||
      isEmpty(lastAddress.value) ||
      isEmpty(nativeDistrict.value) ||
      isEmpty(nativeState.value) ||
      (haveBank === "Y" && (isEmpty(accNo.value) || isEmpty(ifsc.value))) ||
      (occupation === "Others (Specify)" && isEmpty(otherOccupation.value))
    ) {
      this.setState({
        name: {
          ...this.state.name,
          focused: true,
        },
        age: {
          ...this.state.age,
          focused: true,
        },
        mobile: {
          ...this.state.mobile,
          focused: true,
        },
        lastAddress: {
          ...this.state.lastAddress,
          focused: true,
        },
        nativeDistrict: {
          ...this.state.nativeDistrict,
          focused: true,
        },
        nativeState: {
          ...this.state.nativeState,
          focused: true,
        },
        accNo: {
          ...this.state.accNo,
          focused: true,
        },
        ifsc: {
          ...this.state.ifsc,
          focused: true,
        },
      });
      return;
    }
    let data = {};
    data.type = typeMap[type.value];
    data.facilities = facilities.value;
    data.state = state.value;
    data.district = district.value;
    data.name = name.value;
    data.age = age.value;
    data.gender = gender.value;
    data.mobile = mobile.value;
    data.occupation =
      occupation.value === "Others (Specify)"
        ? otherOccupation.value
        : occupation.value;
    data.lastAddress = lastAddress.value;
    data.nativeState = nativeState.value;
    data.nativeDistrict = nativeDistrict.value;
    data.haveBank = haveBank.value;
    if (haveBank.value === "Y") {
      data.accNo = accNo.value;
      data.ifsc = ifsc.value;
    }
    data.haveJandhan = haveJandhan.value;
    data.ujjwala = ujjwala.value;
    data.aadhaar = aadhaar.value;
    if (type.value === 0) {
      data.campName = campName.value;
      data.runBy = runBy.value;
    } else if (type.value === 1) {
      data.employerName = employerName.value;
      data.sector =
        sector.value === "Others (Specify)" ? otherSector.value : sector.value;
    } else {
      data.locality = locality.value;
      data.address = address.value;
    }
    this.props.uiStartLoading();
    this.props.removeError();
    axios
      .post("/data/addMigrant", data)
      .then((resp) => {
        this.props.uiStopLoading();
        this.setState((prevState) => {
          return {
            activeStep: prevState.activeStep + 1,
            success: true,
          };
        });
        console.log(resp.data);
      })
      .catch((err) => {
        this.props.uiStopLoading();
        this.props.setError("Something went wrong");
        console.log(err);
      });
  };

  submitSame = () => {
    this.setState({
      activeStep: 1,
      name: {
        value: "",
        focused: false,
      },
      age: {
        value: "",
        focused: false,
      },
      gender: {
        value: "M",
        focused: false,
      },
      occupation: {
        value: "Agriculture",
        focused: false,
      },
      otherOccupation: {
        value: "",
        focused: false,
      },
      mobile: {
        value: "",
        focused: false,
      },
      lastAddress: {
        value: "",
        focused: false,
      },
      nativeDistrict: {
        value: "",
        focused: false,
      },
      nativeState: {
        value: "Andaman Nicobar",
        focused: false,
      },
      haveBank: {
        value: "N",
        focused: false,
      },
      haveJandhan: {
        value: "N",
        focused: false,
      },
      accNo: {
        value: "",
        focused: false,
      },
      ifsc: {
        value: "",
        focused: false,
      },
      ujjwala: {
        value: "N",
        focused: false,
      },
      aadhaar: {
        value: "",
        focused: false,
      },
      success: false,
    });
  };

  submitNew = () => {
    this.setState({
      activeStep: 0,
      type: {
        value: 0,
      },
      state: {
        value: "Andaman Nicobar",
        focused: false,
      },
      district: {
        value: "",
        focused: false,
      },
      campName: {
        value: "",
        focused: false,
      },
      runBy: {
        value: "Govt",
        focused: false,
      },
      facilities: {
        value: "",
        focused: false,
      },
      employerName: {
        value: "",
        focused: false,
      },
      sector: {
        value: "Building and Construction",
        focused: false,
      },
      otherSector: {
        value: "",
        focused: false,
      },
      locality: {
        value: "",
        focused: false,
      },
      address: {
        value: "",
        focused: false,
      },
      name: {
        value: "",
        focused: false,
      },
      age: {
        value: "",
        focused: false,
      },
      gender: {
        value: "M",
        focused: false,
      },
      occupation: {
        value: "Agriculture",
        focused: false,
      },
      otherOccupation: {
        value: "",
        focused: false,
      },
      mobile: {
        value: "",
        focused: false,
      },
      lastAddress: {
        value: "",
        focused: false,
      },
      nativeDistrict: {
        value: "",
        focused: false,
      },
      nativeState: {
        value: "Andaman Nicobar",
        focused: false,
      },
      haveBank: {
        value: "N",
        focused: false,
      },
      haveJandhan: {
        value: "N",
        focused: false,
      },
      accNo: {
        value: "",
        focused: false,
      },
      ifsc: {
        value: "",
        focused: false,
      },
      ujjwala: {
        value: "N",
        focused: false,
      },
      aadhaar: {
        value: "",
        focused: false,
      },
      success: false,
    });
  };

  handleNext = () => {
    console.log("next");
    const {
      type,
      state,
      district,
      campName,
      facilities,
      employerName,
      sector,
      locality,
      address,
      otherSector,
    } = this.state;
    if (this.state.activeStep === 1) {
      this.handleSubmit();
      return;
    }
    if (type.value === 0) {
      if (
        isEmpty(state.value) ||
        isEmpty(district.value) ||
        isEmpty(campName.value) ||
        isEmpty(facilities.value)
      ) {
        this.setState({
          state: {
            ...this.state.state,
            focused: true,
          },
          district: {
            ...this.state.district,
            focused: true,
          },
          campName: {
            ...this.state.campName,
            focused: true,
          },
          facilities: {
            ...this.state.facilities,
            focused: true,
          },
        });
        return;
      }
    } else if (type.value === 1) {
      if (
        isEmpty(state.value) ||
        isEmpty(district.value) ||
        isEmpty(employerName.value) ||
        isEmpty(facilities.value) ||
        (sector.value === "Others (Specify)" && isEmpty(otherSector.value))
      ) {
        this.setState({
          state: {
            ...this.state.state,
            focused: true,
          },
          district: {
            ...this.state.district,
            focused: true,
          },
          employerName: {
            ...this.state.employerName,
            focused: true,
          },
          facilities: {
            ...this.state.facilities,
            focused: true,
          },
          otherSector: {
            ...this.state.otherSector,
            focused: true,
          },
        });
        return;
      }
    } else if (type.value === 2) {
      if (
        isEmpty(state.value) ||
        isEmpty(district.value) ||
        isEmpty(locality.value) ||
        isEmpty(address.value)
      ) {
        this.setState({
          state: {
            ...this.state.state,
            focused: true,
          },
          district: {
            ...this.state.district,
            focused: true,
          },
          locality: {
            ...this.state.locality,
            focused: true,
          },
          address: {
            ...this.state.address,
            focused: true,
          },
        });
        return;
      }
    }
    this.setState((prevState) => {
      return {
        activeStep: prevState.activeStep + 1,
      };
    });
  };

  handleBack = () => {
    this.setState((prevState) => {
      return {
        activeStep: prevState.activeStep - 1,
      };
    });
  };

  handleInputChange = (field, val) => {
    if (field === "state") {
      this.setState({
        state: {
          focused: true,
          value: val,
        },
        district: {
          value: "",
          focused: true,
        },
      });
    } else if (field === "nativeState") {
      this.setState({
        nativeState: {
          focused: true,
          value: val,
        },
        nativeDistrict: {
          value: "",
          focused: true,
        },
      });
    }
    this.setState({
      [field]: {
        focused: true,
        value: val,
      },
    });
  };

  setFocus = (field) => {
    this.setState({
      [field]: {
        ...this.state[field],
        focused: true,
      },
    });
  };

  render() {
    const { classes, ui } = this.props;
    const {
      activeStep,
      state,
      district,
      type,
      campName,
      runBy,
      facilities,
      employerName,
      sector,
      locality,
      address,
      name,
      age,
      gender,
      occupation,
      mobile,
      lastAddress,
      nativeDistrict,
      nativeState,
      haveBank,
      haveJandhan,
      accNo,
      ifsc,
      ujjwala,
      aadhaar,
      otherSector,
      otherOccupation,
      success,
    } = this.state;
    const Form1Data = {
      state,
      district,
      type,
      campName,
      runBy,
      facilities,
      employerName,
      sector,
      locality,
      address,
      otherSector,
    };
    const form2Data = {
      name,
      age,
      gender,
      occupation,
      mobile,
      lastAddress,
      nativeDistrict,
      nativeState,
      haveBank,
      haveJandhan,
      accNo,
      ifsc,
      ujjwala,
      aadhaar,
      otherOccupation,
    };
    const data = [Form1Data, form2Data];
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" color="inherit" className={classes.appBar}>
          <Toolbar style={{ justifyContent: "space-between" }}></Toolbar>
        </AppBar>
        <Collapse style={{ marginBottom: 10 }} in={ui.error} className="alert">
          <Alert
            severity={"error"}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={this.props.removeError}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
          >
            {ui.errorMessage || "Something Went Wrong"}
          </Alert>
        </Collapse>
        <Dialog
          open={success}
          onClose={this.removeSuccess}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Data Submitted Successfully"}
          </DialogTitle>

          <DialogActions>
            <Button onClick={this.removeSuccess} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <div
              style={{
                width: "100%",
                justifyContent: "center",
                display: "flex",
                marginBottom: 5,
              }}
            >
              <img
                src={Logo}
                style={{ maxHeight: 60, maxWidth: 160 }}
                alt="TeleOPD"
              />
            </div>
            <Typography component="h1" variant="h4" align="center">
              Migrant Workers Information
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you.
                  </Typography>
                  <Typography variant="subtitle1">
                    {`Data Submitted Successfully in ${
                      typeMap[type.value]
                    } category`}
                  </Typography>
                  <div className={classes.buttons}>
                    <Button
                      onClick={this.submitSame}
                      className={classes.button}
                      variant="contained"
                      color="primary"
                    >
                      Submit Again
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.submitNew}
                      className={classes.button}
                    >
                      Submit New
                    </Button>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {activeStep === 1 && (
                    <Typography variant="caption" gutterBottom>
                      {`category - ${typeMap[type.value]}`}
                    </Typography>
                  )}
                  {getStepContent(
                    activeStep,
                    data,
                    this.handleInputChange,
                    this.setFocus
                  )}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                    )}
                    {ui.isLoading ? (
                      <CircularProgress />
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? "Submit" : "Next"}
                      </Button>
                    )}
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
          <Copyright />
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeError: () => dispatch(removeError()),
    setError: (error) => dispatch(setError(error)),
    uiStartLoading: () => dispatch(uiStartLoading()),
    uiStopLoading: () => dispatch(uiStopLoading()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FormContainer));
