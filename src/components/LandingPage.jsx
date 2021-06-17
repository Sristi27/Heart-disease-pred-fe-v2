import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Input,
  FormControl,
  TextField,
  InputLabel,
  FormHelperText,
  Button,
  Backdrop,
  CircularProgress
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
      margin: '0 auto',
      width: "80%"
  },
  inputs:
  {
      width:'90%',
      margin:'8px auto'
  }
}));

const LandingPage = () => {
  const classes = useStyles();

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
    slope:"",
    majorVessels:"",
    thal:""
  });

  const [prediction,setPrediction] = useState(false)
  const [open,setOpen]=useState(false);


 
  const handleSubmit = () => {


    for(let key in values)
    {
        if(values[key]=='')
        {
            alert("Please fill all the fields!")
            return false;
        }
    }

    setOpen(true);
    var formData = new FormData();
    formData.append("age",values.age);
    formData.append("sex",values.sex);
    formData.append("cp",values.chestPainType);
    formData.append("trestbps",values.restingBloodPressure);
    formData.append("chol",values.cholestrol);
    formData.append("fbs",values.fastingBloodSugar);
    formData.append("restecg",values.ecg);
    formData.append("thalach",values.heartRate);
    formData.append("exang",values.agina);
    formData.append("oldpeak",values.oldpeak);
    formData.append("slope",values.slope);
    formData.append("ca",values.majorVessels);
    formData.append("thal",values.thal);

    // console.log(formData.get('age'))
    fetch("https://heart-attack-model.herokuapp.com/predict",
    {
        method:'POST',
        body:formData
    }).then(res=>res.json())
    .then(res=>
        {
            if(res.value=='Yes')
            setPrediction(true);
            else if(res.value=='No')
            setPrediction(false);
            setOpen(false);
        })
    .catch(err=>
        {
            setOpen(false)
            alert(err)
        
        })

  };

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField  className={classes.inputs}
          value={values.age}
          id="outlined-primary"
          label="Age"
          color="primary"
          variant="outlined"
          onChange={(e) => setValues({ ...values, age: e.target.value })}
        />
        <TextField className={classes.inputs}
          value={values.sex}
          variant="outlined"
          id="outlined-primary"
          label="Sex"
          //   <InputLabel id="demo-simple-select-label">Age</InputLabel>
          //   <Select
          //     labelId="demo-simple-select-label"
          //     id="demo-simple-select"
          //     value={age}
          //     onChange={handleChange}
          //   >
          //     <MenuItem value={10}>Ten</MenuItem>
          //     <MenuItem value={20}>Twenty</MenuItem>
          //     <MenuItem value={30}>Thirty</MenuItem>
          //   </Select>
          color="primary"
          onChange={(e) => setValues({ ...values, sex: e.target.value })}
        />
        <TextField className={classes.inputs}
          value={values.chestPainType}
          id="outlined-primary"
          label="Chest Pain Type"
          variant="outlined"
          color="primary"
          onChange={(e) =>
            setValues({ ...values, chestPainType: e.target.value })
          }
        />
        <TextField className={classes.inputs}
          value={values.restingBloodPressure}
          id="outlined-primary"
          label="Blood Pressure in mm Hg"
          variant="outlined"
          color="primary"
          onChange={(e) =>
            setValues({ ...values, restingBloodPressure: e.target.value })
          }
        />
        <TextField className={classes.inputs}
          value={values.cholestrol}
          id="outlined-primary"
          label="Cholestrol in mg/dl"
          variant="outlined"
          color="primary"
          onChange={(e) => setValues({ ...values, cholestrol: e.target.value })}
        />

        <TextField className={classes.inputs}
          value={values.fastingBloodSugar}
          id="outlined-primary"
          label="Fasting Blood Pressure 120mg/dl 1 for true 0 for false"
          variant="outlined"
          color="primary"
          onChange={(e) =>
            setValues({ ...values, fastingBloodSugar: e.target.value })
          }
        />

<TextField className={classes.inputs}
          value={values.ecg}
          id="outlined-primary"
          label="Ecg"
          variant="outlined"
          color="primary"
          onChange={(e) => setValues({ ...values, ecg: e.target.value })}
        />
        <TextField className={classes.inputs}
          value={values.heartRate}
          id="outlined-primary"
          label="Max Heart Rate"
          variant="outlined"
          color="primary"
          onChange={(e) => setValues({ ...values, heartRate: e.target.value })}
        />

        {/* select  */}
        <TextField className={classes.inputs}
          id="outlined-primary"
          label="Excercised Induced Agina"
          variant="outlined"
          value={values.agina}
          color="primary"
          onChange={(e) => setValues({ ...values, agina: e.target.value })}
        />

        <TextField className={classes.inputs}
          id="outlined-primary"
          label="Old Peak"
          variant="outlined"
          onChange={(e) => setValues({ ...values, oldpeak: e.target.value })}
          value={values.oldpeak}
          color="primary"
        />
        <TextField className={classes.inputs}
          id="outlined-primary"
          label="Slope"
          variant="outlined"
          onChange={(e) => setValues({ ...values,slope: e.target.value })}
          value={values.slope}
          color="primary"
        />
        <TextField className={classes.inputs}
          id="outlined-primary"
          label="Major Vessels"
          variant="outlined"
          onChange={(e) => setValues({ ...values, majorVessels: e.target.value })}
          value={values.majorVessels}
          color="primary"
        />
        <TextField className={classes.inputs}
          id="outlined-primary"
          label="Thal"
          variant="outlined"
          onChange={(e) => setValues({ ...values, thal: e.target.value })}
          value={values.thal}
          color="primary"
        />
        <Button onClick={handleSubmit} 
        className={classes.inputs} variant="contained" color="primary">
          Submit
        </Button>
      </form>

        <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
        </Backdrop>
        
    </div>
  );
};

export default LandingPage;
