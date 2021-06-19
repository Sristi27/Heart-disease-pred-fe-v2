import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  InputLabel,
  Button,
  FormControl,
  Backdrop,
  MenuItem,
  Select,
  Dialog,
  Input,
  Box,
  DialogActions,
  DialogContent,
  Grid,
  DialogContentText,
  Typography,
  DialogTitle,
  FormControlLabel,
  CircularProgress,
  Slide,
} from "@material-ui/core";
import resultimg from "./../images/resultimg.jpeg";
import icon from "./../images/icon.png";

const useStyles = makeStyles((theme) => ({
  inputs: {
    width: "85%",
    margin: "0 auto",
    marginBottom:'8px'
  },
  root:
{
  display:'flex',
  alignItems:'center'
},
div:
{
  width:"100%",
  flexGrow:1
},
  form: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
  },
  image: {
    width: "40%",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 60,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const LandingPage = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [prediction, setPrediction] = useState(false);
  const [open, setOpen] = useState(false);

  const [values, setValues] = useState({
    age: "",
    sex: "",
    chestPainType: "",
    restingBloodPressure: "",
    cholestrol: "",
    fastingBloodSugar: "",
    ecg: "",
    heartRate: "",
    agina: "",
    oldpeak: "",
    slope: "",
    majorVessels: "",
    thal: "",
  });

  const [result, setResult] = useState({
    title: "",
    content: "",
    status: "",
  });

  const handleClose = () => {
    setOpenDialog(false);
  };


  const reset = () =>
  {
     setValues(
       {
        age: "",
        sex: "",
        chestPainType: "",
        restingBloodPressure: "",
        cholestrol: "",
        fastingBloodSugar: "",
        ecg: "",
        heartRate: "",
        agina: "",
        oldpeak: "",
        slope: "",
        majorVessels: "",
        thal: "",
       }
     )
  }
  const handleSubmit = () => {
    for (let key in values) {
      if (values[key] == "") {
        alert("Please fill all the fields!");
        return false;
      }
    }

    setOpen(true);
    setOpenDialog(false);

    var formData = new FormData();
    formData.append("age", values.age);
    formData.append("sex", values.sex);
    formData.append("cp", values.chestPainType);
    formData.append("trestbps", values.restingBloodPressure);
    formData.append("chol", values.cholestrol);
    formData.append("fbs", values.fastingBloodSugar);
    formData.append("restecg", values.ecg);
    formData.append("thalach", values.heartRate);
    formData.append("exang", values.agina);
    formData.append("oldpeak", values.oldpeak);
    formData.append("slope", values.slope);
    formData.append("ca", values.majorVessels);
    formData.append("thal", values.thal);

    // console.log(formData.get('age'))
    fetch("https://heart-attack-model.herokuapp.com/predict", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.value == "Yes") {
          setPrediction(true);
          setOpenDialog(true);
          setResult({
            title: "You might be in danger!",
            content:
              "We are sorry to inform you that we have detected chances of you being prone to a\
               heart attack or some blockage.We would suggest you immediately consult\
                a doctor and get a prescribed health checkup done!",
            status: true,
          });
          setOpen(false); //progress spinner closing
        } else if (res.value == "No") {
          setPrediction(false);
          setOpenDialog(true);
          setResult({
            title: "No Worries at all!",
            content:
              "We are happy to inform you that we have detected no chances of you having \
               a heart disease anytime soon.But,we request you to consult a doctor\
               and get a checkup done for your safety and well being!",
            status: true,
          });
        }
        setOpen(false);
      })
      .catch((err) => {
        alert("We are facing some issues.Please come and try again later!");
        setOpen(false);
      });
  };

  return (
    <Box pt={2} pb={2}>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12} lg={6}>
        <img src={icon} class="icon"/>
        </Grid>
        <Grid item xs={12} lg={6}>
        <form className="form" noValidate autoComplete="off">
          <h3>Please enter your details below ~</h3>
          <Typography
            variant="subtitle2"
            style={{ fontSize: "14px" }}
            color="secondary"
          >
            (All details are mandatory)
          </Typography>
          <br />
          {/* age */}
          <TextField
            className={classes.inputs}
            value={values.age}
            id="outlined-primary"
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
            <InputLabel htmlFor="outlined-age-native-simple">Gender</InputLabel>
            <Select
              native
              value={values.sex}
              onChange={(e) => setValues({ ...values, sex: e.target.value })}
              label="Gender"
            >
              <option aria-label="None" value="" />
              <option value={0}>Male</option>
              <option value={1}>Female</option>
            </Select>
          </FormControl>

          {/* chest pain  */}
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

          {/* presure */}
          <TextField
            className={classes.inputs}
            value={values.restingBloodPressure}
            required
            id="outlined-primary"
            label="Blood Pressure in mm Hg"
            variant="outlined"
            color="primary"
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
            color="primary"
            required
            onChange={(e) =>
              setValues({ ...values, cholestrol: e.target.value })
            }
          />

          {/* sugar */}
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

          {/* ecg  */}
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
              onChange={(e) => setValues({ ...values, ecg: e.target.value })}
            >
              <option aria-label="None" value="" />
              <option value={0}>Normal</option>
              <option value={1}>Having ST-T wave abnormality</option>
              <option value={2}>
                Probable or definite left ventricular hypertrophy
              </option>
            </Select>
          </FormControl>

          {/* heartrate */}
          <TextField
            required
            className={classes.inputs}
            value={values.heartRate}
            id="outlined-primary"
            label="Max Heart Rate"
            variant="outlined"
            color="primary"
            onChange={(e) =>
              setValues({ ...values, heartRate: e.target.value })
            }
          />

          {/* agina */}

          <FormControl
            variant="outlined"
            className={classes.FormControl}
            required
            id="select"
          >
            <InputLabel htmlFor="outlined-age-native-simple">
              Excercised Induced Agina?
            </InputLabel>
            <Select
              label="Excercised Induced Agina?"
              native
              value={values.agina}
              onChange={(e) => setValues({ ...values, agina: e.target.value })}
            >
              <option aria-label="None" value="" />
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </Select>
          </FormControl>

          {/* oldpeak */}
          <TextField
            required
            className={classes.inputs}
            id="outlined-primary"
            label="ST Depression Induced by Excercise Relative to Rest"
            variant="outlined"
            onChange={(e) => setValues({ ...values, oldpeak: e.target.value })}
            value={values.oldpeak}
            color="primary"
          />

          {/* slope  */}
          <FormControl
            variant="outlined"
            required
            className={classes.FormControl}
            id="select"
          >
            <InputLabel htmlFor="outlined-age-native-simple">
              Slope of Peak Excercise Segment?
            </InputLabel>
            <Select
              label="Slope of Peak Excercise Segment?"
              native
              value={values.slope}
              onChange={(e) => setValues({ ...values, slope: e.target.value })}
            >
              <option aria-label="None" value="" />
              <option value={0}>Upsloping</option>
              <option value={1}>Flat</option>
              <option value={2}>Downsloping</option>
            </Select>
          </FormControl>

          {/* thal  */}
          <FormControl
            variant="outlined"
            required
            className={classes.FormControl}
            id="select"
          >
            <InputLabel htmlFor="outlined-age-native-simple">
              No. of Major Vessels coloured by Fluorosopy
            </InputLabel>
            <Select
              native
              label="No. of Major Vessels coloured by Fluorosopy"
              value={values.majorVessels}
              onChange={(e) =>
                setValues({ ...values, majorVessels: e.target.value })
              }
            >
              <option aria-label="None" value="" />
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </Select>
          </FormControl>

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
              onChange={(e) => setValues({ ...values, thal: e.target.value })}
            >
              <option aria-label="None" value="" />
              <option value={3}>Normal</option>
              <option value={6}>Fixed Defect</option>
              <option value={7}>Reversible Defect</option>
            </Select>
          </FormControl>

<div className={classes.inputs} style={{display:'flex',justifyContent:'space-around'}}>
          <Button
          style={{width:'45%'}}
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
          style={{width:'45%'}} onClick={reset} variant="contained" color="primary">Reset Form</Button>
          </div>
        </form>
     
        </Grid>
      </Grid>
      
      
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress />
        <Typography variant="h5">Loading....</Typography>
      </Backdrop>

      {/* for result  */}
      {result ? (
        <Dialog
          open={openDialog}
          TransitionComponent={Transition}
          keepMounted
          maxWidth="sm"
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <h3>{result.title}</h3>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {result.content}
                <img src={resultimg} width="320px" height="220px" />
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default LandingPage;
