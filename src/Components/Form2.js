import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { isEmpty, getStates, getDistrict } from "../helpers";

export default function AddressForm(props) {
  const { data } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoFocus
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            onChange={(event) =>
              props.handleInputChange("name", event.target.value)
            }
            value={data.name.value}
            onFocus={() => props.setFocus("name")}
            error={data.name.focused && isEmpty(data.name.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="age"
            name="age"
            label="Age"
            fullWidth
            onChange={(event) =>
              props.handleInputChange("age", event.target.value)
            }
            value={data.age.value}
            onFocus={() => props.setFocus("age")}
            error={
              data.age.focused &&
              (isEmpty(data.age.value) || isNaN(data.age.value))
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl style={{ minWidth: "100%" }}>
            <InputLabel id="gender">gender</InputLabel>
            <Select
              labelId="gender"
              id="gender"
              value={data.gender.value}
              onChange={(event) =>
                props.handleInputChange("gender", event.target.value)
              }
            >
              <MenuItem value={"M"}>Male</MenuItem>
              <MenuItem value={"F"}>Female</MenuItem>
              <MenuItem value={"O"}>Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="mobile"
            name="mobile"
            label="mobile"
            fullWidth
            onChange={(event) =>
              props.handleInputChange("mobile", event.target.value)
            }
            value={data.mobile.value}
            onFocus={() => props.setFocus("mobile")}
            error={
              data.mobile.focused &&
              (isEmpty(data.mobile.value) ||
                !data.mobile.value.match("^[0-9]{10}$"))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl style={{ minWidth: "100%" }}>
            <InputLabel id="runBy">Occupation</InputLabel>
            <Select
              labelId="occupation"
              id="occupation"
              value={data.occupation.value}
              onChange={(event) =>
                props.handleInputChange("occupation", event.target.value)
              }
            >
              <MenuItem value={"Agriculture"}>Agriculture</MenuItem>
              <MenuItem value={"Domestic Work"}>Domestic Work</MenuItem>
              <MenuItem value={"Building and other construction work"}>
                Building and other construction work
              </MenuItem>
              <MenuItem value={"Electronic, Electrical Goods Repairs"}>
                Electronic, Electrical Goods Repairs
              </MenuItem>
              <MenuItem value={"Shop and Establishment Service"}>
                Shop and Establishment Service
              </MenuItem>
              <MenuItem value={"Automobile Work"}>Automobile Work</MenuItem>
              <MenuItem value={"Transport Service,Driving,Cleaning etc"}>
                Transport Service,Driving,Cleaning etc
              </MenuItem>
              <MenuItem value={"Security Service"}>Security Service</MenuItem>
              <MenuItem value={"Brick Kiln work"}>Brick Kiln work</MenuItem>
              <MenuItem value={"Hotel and restaurent service"}>
                Hotel and restaurent service
              </MenuItem>
              <MenuItem value={"Rickshaw pulling"}>Rickshaw pulling</MenuItem>
              <MenuItem value={"Food Processing"}>Food Processing</MenuItem>
              <MenuItem value={"Beauty Salon and hairdressing"}>
                Beauty Salon and hairdressing
              </MenuItem>
              <MenuItem value={"Macine Operator,Factory Worker"}>
                Macine Operator,Factory Worker
              </MenuItem>
              <MenuItem value={"Others (Specify)"}>Others (Specify)</MenuItem>
            </Select>
          </FormControl>
          {data.occupation.value === "Others (Specify)" && (
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="otherOccupation"
                name="otherOccupation"
                label="Other Occupation"
                multiline
                fullWidth
                onChange={(event) =>
                  props.handleInputChange("otherOccupation", event.target.value)
                }
                value={data.otherOccupation.value}
                onFocus={() => props.setFocus("otherOccupation")}
                error={
                  data.otherOccupation.focused &&
                  isEmpty(data.otherOccupation.value)
                }
              />
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="last"
            name="lastAddress"
            label="Last Address"
            fullWidth
            onChange={(event) =>
              props.handleInputChange("lastAddress", event.target.value)
            }
            value={data.lastAddress.value}
            onFocus={() => props.setFocus("lastAddress")}
            error={data.lastAddress.focused && isEmpty(data.lastAddress.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl style={{ minWidth: "100%" }}>
            <InputLabel id="nativeState">Native State</InputLabel>
            <Select
              labelId="nativeState"
              id="nativeState"
              value={data.nativeState.value}
              onChange={(event) =>
                props.handleInputChange("nativeState", event.target.value)
              }
            >
              {getStates().map((s, i) => {
                return (
                  <MenuItem value={s} key={s + i}>
                    {s}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl style={{ minWidth: "100%" }}>
            <InputLabel id="nativeDistrict">Native District</InputLabel>
            <Select
              error={
                isEmpty(data.nativeDistrict.value) &&
                data.nativeDistrict.focused
              }
              labelId="nativeDistrict"
              id="nativeDistrict"
              value={data.nativeDistrict.value}
              onChange={(event) =>
                props.handleInputChange("nativeDistrict", event.target.value)
              }
            >
              {getDistrict(data.nativeState.value).map((s, i) => {
                return (
                  <MenuItem value={s} key={s + i}>
                    {s}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl style={{ minWidth: "100%" }}>
            <InputLabel id="Bank A/c">Bank A/C</InputLabel>
            <Select
              labelId="haveBank"
              id="haveBank"
              value={data.haveBank.value}
              onChange={(event) =>
                props.handleInputChange("haveBank", event.target.value)
              }
            >
              <MenuItem value={"Y"}>Yes</MenuItem>
              <MenuItem value={"N"}>No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl style={{ minWidth: "100%" }}>
            <InputLabel id="Jandhan A/C">Jandhan A/C</InputLabel>
            <Select
              labelId="haveJandhan"
              id="haveJandhan"
              value={data.haveJandhan.value}
              onChange={(event) =>
                props.handleInputChange("haveJandhan", event.target.value)
              }
            >
              <MenuItem value={"Y"}>Yes</MenuItem>
              <MenuItem value={"N"}>No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {data.haveBank.value === "Y" && (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="accNo"
                name="accNo"
                label="Bank/Ac"
                fullWidth
                onChange={(event) =>
                  props.handleInputChange("accNo", event.target.value)
                }
                value={data.accNo.value}
                onFocus={() => props.setFocus("accNo")}
                error={data.accNo.focused && isEmpty(data.accNo.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="ifsc"
                name="ifsc"
                label="IFSC Code"
                fullWidth
                onChange={(event) =>
                  props.handleInputChange("ifsc", event.target.value)
                }
                value={data.ifsc.value}
                onFocus={() => props.setFocus("ifsc")}
                error={data.ifsc.focused && isEmpty(data.ifsc.value)}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12} sm={6}>
          <FormControl style={{ minWidth: "100%" }}>
            <InputLabel id="Ujjwala">Ujjwala</InputLabel>
            <Select
              labelId="ujjwala"
              id="ujjwala"
              value={data.ujjwala.value}
              onChange={(event) =>
                props.handleInputChange("ujjwala", event.target.value)
              }
            >
              <MenuItem value={"Y"}>Yes</MenuItem>
              <MenuItem value={"N"}>No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="aadhaar"
            name="aadhaar"
            label="Aadhaar No"
            fullWidth
            onChange={(event) =>
              props.handleInputChange("aadhaar", event.target.value)
            }
            value={data.aadhaar.value}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
