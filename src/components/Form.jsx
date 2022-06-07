import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  InputLabel,
  FormControl,
  Grid, Button,
  Select,
  Typography,
  Box,
} from "@material-ui/core";
import { CustomTooltip } from "./CustomTooltip";
import { elements } from "./FormElements/contents";
import ThalassemiaOptions from "./TooltipOptions/ThalassemiaOptions";
import ChestPainOptions from "./TooltipOptions/ChestPainOptions";
import ECGOptions from "./TooltipOptions/ECGOptions";
import { cholDesc, excerciseInducedAnginaDesc, HeartRateDesc, sugarDesc } from "./TooltipOptions/Desc";
import BloodPressureOptions from "./TooltipOptions/BloodPressureOptions";

const useStyles = makeStyles((theme) => ({
  inputs: {
    width: "85%"
  },

  FormControl: {
    minWidth: 60
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
  const [submitInProgress,setSubmitInProgress] = useState(false);

  const submitForm = () =>
  {
    setSubmitInProgress(true);
    submitFn(values);
  }

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
              style={{ margin:'8px auto' }}
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

            {/* heartrate */}
            <CustomTooltip placement="left-start" title={<Typography
            variant="caption">
              {HeartRateDesc}
            </Typography>}>
            <TextField
              required
              className={classes.inputs}
              style={{ marginBottom:'16px', marginTop: '8px' }}
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
          
            {/* presure */}
           <CustomTooltip title={BloodPressureOptions} placement="right-start">
           <TextField
              className={classes.inputs}
              style={{ marginBottom:'16px' }}
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
            <CustomTooltip title={
            <Typography variant="caption"
            placement="right-start"
            > {cholDesc} </Typography>}>
              <TextField
              style={{ marginBottom:'16px' }}
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

          {/* sugar */}
          <Grid item xs={12} lg={6}>
            <CustomTooltip 
            placement="left-start"
            title={<Typography variant="caption">{sugarDesc} </Typography>}>
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
            </CustomTooltip>

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

            {/* chest pain  */}
            <CustomTooltip placement="left-start" title={ChestPainOptions}>
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

            {/* angina */}
            <CustomTooltip title={<Typography variant="caption">
             { excerciseInducedAnginaDesc}
            </Typography>} placement="left-start">
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

        <Grid container alignItems="center" style={{ marginBottom:'16px' }}>
          <Grid item xs={12} lg={6} />
          <Grid item xs={12} lg={6}>
            <Button
              disabled={submitInProgress}
              onClick={() => reset()}
              style={{ width: "30%", marginRight: "30px" }}
              variant="contained"
              color="primary"
            >
              Reset Form
            </Button>
            <Button
              disabled={submitInProgress}
              style={{ width: "30%" }}
              onClick={submitForm}
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
