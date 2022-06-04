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
  Box,
} from "@material-ui/core";
import "./../App.css";
import { CustomTooltip } from "./CustomTooltip";
import ThalassemiaOptions from "./TooltipOptions/ThalassemiaOptions";
import ChestPainOptions from "./TooltipOptions/ChestPainOptions";
import ECGOptions from "./TooltipOptions/ECGOptions";
import { elements } from "./FormElements/contents";

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
      <Box mt={3} mb={5}>
        <Typography variant="h4">Please enter your details below ~</Typography>
      </Box>
      <form className="form" noValidate autoComplete="off">
        <Grid container alignItems="center" justify="center">
          <Grid item xs={12} lg={6}>
            {/* age */}
            <TextField
              className={classes.inputs}
              value={values.age}
              type="number"
              id="outlined-primary"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                min: 1,
                max: 100,
              }}
              required
              label="Age"
              color="primary"
              variant="outlined"
              onChange={(e) => setValues({ ...values, age: e.target.value })}
            />

            {/* sex */}
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
                onChange={(e) => setValues({ ...values, sex: e.target.value })}
                label="Gender"
              >
                <option aria-label="None" value="" />
                {elements.gender.map((elem) => (
                  <option value={elem.value}>{elem.label}</option>
                ))}
              </Select>
            </FormControl>

            {/* chest pain  */}
            <CustomTooltip placement="right-start" title={ChestPainOptions}>
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
                  {elements.chestPain.map((elem) => (
                    <option value={elem.value}>{elem.label}</option>
                  ))}
                </Select>
              </FormControl>
            </CustomTooltip>

            {/* presure */}
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

            {/* chol */}
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
          </Grid>

          {/* sugar */}
          <Grid item xs={12} lg={6}>
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
                {elements.sugar.map((elem) => (
                  <option value={elem.value}>{elem.label}</option>
                ))}
              </Select>
            </FormControl>

            {/* ecg  */}
            <CustomTooltip placement="left-start" title={ECGOptions}>
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
                  {elements.ecg.map((elem) => (
                    <option value={elem.value}>{elem.label}</option>
                  ))}
                </Select>
              </FormControl>
            </CustomTooltip>

            {/* heartrate */}
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
                  {elements.angina.map((elem) => (
                    <option value={elem.value}>{elem.label}</option>
                  ))}
                </Select>
              </FormControl>
            </CustomTooltip>

            {/* Thalassemia */}
            <CustomTooltip placement="left-start" title={ThalassemiaOptions}>
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
                  {elements.thal.map((elem) => (
                    <option value={elem.value}>{elem.label}</option>
                  ))}
                </Select>
              </FormControl>
            </CustomTooltip>
          </Grid>
        </Grid>

        <Grid container alignItems="center" className={classes.btnDiv}>
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
