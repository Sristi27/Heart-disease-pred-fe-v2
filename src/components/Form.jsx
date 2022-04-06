import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  InputLabel,
  Button,
  FormControl,
  Grid,
  Select,
  Typography,
  Tooltip,
} from "@material-ui/core";
import "./../App.css";
import { CustomTooltip } from "./CustomTooltip";

const useStyles = makeStyles((theme) => ({
  inputs: {
    width: "85%",
    margin: "15px auto",
    marginBottom: "15px",
  },

  FormControl: {
    marginTop: "0",
    minWidth: 60,
    marginBottom: "18px",
  },
  btnDiv: {
    marginTop: "15px",
  },
}));

const Form = ({ submitFn }) => {
  const classes = useStyles();
  const defaultObj = {
    age: "",
    sex: "",
    chestPainType: "",
    restingBloodPressure: "",
    cholestrol: "",
    fastingBloodSugar: "",
    ecg: "",
    heartRate: "",
    angina: "",
    thal: "",
  };
  const [values, setValues] = useState(defaultObj);
  const reset = () => setValues(defaultObj);

  return (
    <>
      <form className="form" noValidate autoComplete="off">
        <h2>Please enter your details below ~</h2>
        <Typography
          variant="subtitle2"
          style={{ fontSize: "15px" }}
          color="secondary"
        >
          (All details are mandatory)
        </Typography>
        <br />
        <Grid container alignItems="center" justify="center">
          <Grid item xs={12} lg={6}>
            {/* age */}
            <CustomTooltip title="Age" placement="right-start">
              <TextField
                className={classes.inputs}
                value={values.age}
                type="number"
                id="outlined-primary"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  min: 10,
                  max: 20,
                }}
                required
                label="Age"
                color="primary"
                variant="outlined"
                onChange={(e) => setValues({ ...values, age: e.target.value })}
              />
            </CustomTooltip>

            {/* sex */}
            <CustomTooltip title="Gender" placement="right-start">
              <FormControl
                required
                variant="outlined"
                id="select"
                className={classes.FormControl}
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Gender
                </InputLabel>
                <Select
                  native
                  value={values.sex}
                  onChange={(e) =>
                    setValues({ ...values, sex: e.target.value })
                  }
                  label="Gender"
                >
                  <option aria-label="None" value="" />
                  <option value={0}>Male</option>
                  <option value={1}>Female</option>
                </Select>
              </FormControl>
            </CustomTooltip>

            {/* chest pain  */}
            <CustomTooltip placement="right-start"
            title={
              <React.Fragment>
                <Typography variant="subtitle1" color="inherit">
                  Chest Pain Type
                </Typography>
                <div>
                  <span style={{display:'flex'}}>
                  <Typography variant="subtitle2">
                    1.Typical Angina:
                  </Typography>
                  <Typography variant="body2">hello</Typography>
                  </span>
                  <span style={{display:'flex'}}>
                  <Typography variant="subtitle2">
                    2.Atypical Angina:
                  </Typography>
                  <Typography variant="body2">hello</Typography>
                  </span>
                  <span style={{display:'flex'}}>
                  <Typography variant="subtitle2">
                    3.Non-anginal pain:
                  </Typography>
                  <Typography variant="body2">hello</Typography>
                  </span>
                  <span style={{display:'flex'}}>
                  <Typography variant="subtitle2">
                    4.Asymptomatic:
                  </Typography>
                  <Typography variant="body2">hello</Typography>
                  </span>
                </div>
              </React.Fragment>
            }>
              <FormControl
                required
                variant="outlined"
                className={classes.FormControl}
                id="select"
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Chest Pain Type
                </InputLabel>
                <Select
                  native
                  value={values.chestPainType}
                  onChange={(e) =>
                    setValues({ ...values, chestPainType: e.target.value })
                  }
                  label="Chest Pain Type"
                >
                  <option aria-label="None" value="" />
                  <option value={0}>Typical Angina</option>
                  <option value={1}>Atypical Angina</option>
                  <option value={2}>Non-anginal Pain</option>
                  <option value={3}>Asymptomatic</option>
                </Select>
              </FormControl>
            </CustomTooltip>

            {/* presure */}
            <CustomTooltip title="Blood Pressure" placement="right-start">
              <TextField
                className={classes.inputs}
                value={values.restingBloodPressure}
                required
                id="outlined-primary"
                type="number"
                label="Blood Pressure in mm Hg"
                variant="outlined"
                color="primary"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                onChange={(e) =>
                  setValues({ ...values, restingBloodPressure: e.target.value })
                }
              />
            </CustomTooltip>

            {/* chol */}
            <CustomTooltip title="Cholestrol Value" placement="right-start">
              <TextField
                className={classes.inputs}
                value={values.cholestrol}
                id="outlined-primary"
                label="Cholestrol in mg/dl"
                variant="outlined"
                type="number"
                color="primary"
                required
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                onChange={(e) =>
                  setValues({ ...values, cholestrol: e.target.value })
                }
              />
            </CustomTooltip>
          </Grid>
          <Grid item xs={12} lg={6}>
            {/* sugar */}
            <CustomTooltip
              title="Fasting Blood sugar rate"
              placement="left-start"
            >
              <FormControl
                variant="outlined"
                className={classes.FormControl}
                required
                id="select"
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Fasting Blood Sugar greater than 120mg/dl?
                </InputLabel>
                <Select
                  native
                  value={values.fastingBloodSugar}
                  onChange={(e) =>
                    setValues({ ...values, fastingBloodSugar: e.target.value })
                  }
                  label="Fasting Blood Sugar greater than 120mg/dl?"
                >
                  <option aria-label="None" value="" />
                  <option value={0}>No</option>
                  <option value={1}>Yes</option>
                </Select>
              </FormControl>
            </CustomTooltip>

            {/* ecg  */}
            <CustomTooltip
              placement="left-start"
              title={
                <React.Fragment>
                  <Typography variant="subtitle1" color="inherit">
                    Eco-cardiogram Results
                  </Typography>
                  <div>
                    <span style={{display:'flex'}}>
                    <Typography variant="subtitle2">
                      1.ST-T Wave Abnormality:
                    </Typography>
                    <Typography variant="body2">hello</Typography>
                    </span>
                    <span style={{display:'flex'}}>
                    <Typography variant="subtitle2">
                      2.Left ventricular hypertrophy:
                    </Typography>
                    <Typography variant="body2">hello</Typography>
                    </span>
                  </div>
                </React.Fragment>
              }
            >
              <FormControl
                required
                variant="outlined"
                className={classes.FormControl}
                id="select"
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  ECG Results
                </InputLabel>
                <Select
                  native
                  value={values.ecg}
                  label="ECG Results"
                  onChange={(e) =>
                    setValues({ ...values, ecg: e.target.value })
                  }
                >
                  <option aria-label="None" value="" />
                  <option value={0}>Normal</option>
                  <option value={1}>Having ST-T wave abnormality</option>
                  <option value={2}>
                    Probable or definite left ventricular hypertrophy
                  </option>
                </Select>
              </FormControl>
            </CustomTooltip>

            {/* heartrate */}
            <CustomTooltip title="Maximum Heart Rate" placement="left-start">
              <TextField
                required
                className={classes.inputs}
                value={values.heartRate}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                id="outlined-primary"
                label="Max Heart Rate"
                type="number"
                variant="outlined"
                color="primary"
                onChange={(e) =>
                  setValues({ ...values, heartRate: e.target.value })
                }
              />
            </CustomTooltip>

            {/* angina */}
            <CustomTooltip title="Angina" placement="left-start">
              <FormControl
                variant="outlined"
                className={classes.FormControl}
                required
                id="select"
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Excercised Induced angina?
                </InputLabel>
                <Select
                  label="Excercised Induced angina?"
                  native
                  value={values.angina}
                  onChange={(e) =>
                    setValues({ ...values, angina: e.target.value })
                  }
                >
                  <option aria-label="None" value="" />
                  <option value={0}>No</option>
                  <option value={1}>Yes</option>
                </Select>
              </FormControl>
            </CustomTooltip>

            {/* Thalassemia */}
            <CustomTooltip placement="left-start"
            title={
              <React.Fragment>
                <Typography variant="subtitle1" color="inherit">
                  Thalassemia
                </Typography>
                <div>
                  <span style={{display:'flex'}}>
                  <Typography variant="subtitle2">
                    1.Fixed Defect:
                  </Typography>
                  <Typography variant="body2">hello</Typography>
                  </span>
                  <span style={{display:'flex'}}>
                  <Typography variant="subtitle2">
                    2.Reversible Defect:
                  </Typography>
                  <Typography variant="body2">hello</Typography>
                  </span>
                </div>
              </React.Fragment>
            }>
              <FormControl
                variant="outlined"
                className={classes.FormControl}
                id="select"
                required
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Thalassemia
                </InputLabel>
                <Select
                  label="Thalassemia"
                  native
                  value={values.thal}
                  onChange={(e) =>
                    setValues({ ...values, thal: e.target.value })
                  }
                >
                  <option aria-label="None" value="" />
                  <option value={3}>Normal</option>
                  <option value={6}>Fixed Defect</option>
                  <option value={7}>Reversible Defect</option>
                </Select>
              </FormControl>
            </CustomTooltip>
          </Grid>
        </Grid>

        <Grid
          container
          alignItems="center"
          className={classes.btnDiv}
          justifyContent="right"
        >
          <Grid item xs={12} lg={6} />
          <Grid item xs={12} lg={6}>
            <Button
              onClick={() => reset()}
              style={{ width: "30%", marginRight: "30px" }}
              variant="contained"
              color="primary"
            >
              Reset Form
            </Button>
            <Button
              style={{ width: "30%" }}
              onClick={() => submitFn(values)}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Form;
