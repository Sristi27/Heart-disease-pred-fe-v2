import React, { useState } from "react";
import { errorData, NoRiskData, RiskData } from "../utils/resultData";
import Form from "./Form";
import SnackbarElem from "./Snackbar";

const Prediction = ({ setOpenDialog, setOpen, setResult, setSuccessMsg }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const modelURL = process.env.REACT_APP_MODEL_URL;

  const createForm = (formData, values) => {
    formData.append("age", parseInt(values.age));
    formData.append("sex", parseInt(values.sex));
    formData.append("cp", parseInt(values.chestPainType));
    formData.append("trestbps", parseInt(values.restingBloodPressure));
    formData.append("chol", parseInt(values.cholestrol));
    formData.append("fbs", parseInt(values.fastingBloodSugar));
    formData.append("restecg", parseInt(values.ecg));
    formData.append("thalach", parseInt(values.heartRate));
    formData.append("exang", parseInt(values.angina));
    formData.append("thal", parseInt(values.thal));
  };

  const medCheckupData = (values, result) =>
    JSON.stringify({
      email: JSON.parse(localStorage.getItem("loginData")).email,
      age: parseInt(values.age),
      sex: parseInt(values.sex),
      chestPainType: parseInt(values.chestPainType),
      pressure: parseInt(values.restingBloodPressure),
      cholestrol: parseInt(values.cholestrol),
      sugar: parseInt(values.fastingBloodSugar),
      ecg: parseInt(values.ecg),
      heartRate: parseInt(values.heartRate),
      angina: parseInt(values.angina),
      thal: parseInt(values.thal),
      result: result,
    });

  const handleSubmit = (values) => {
    for (let key in values) {
      if (values[key] === "") {
        // if any of the fields are empty
        setErrorMsg("Please fill all the fields!");
        return false;
      }
    }
    setOpen(true); //loading = true // loading material ui
    setOpenDialog(false);

    //create body
    var formData = new FormData();
    createForm(formData, values); // form created
    // values from Form state - all input values
    // predicturl -> ml model api call

    fetch(`${modelURL}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(async (res) => {
        
        //prediction dialog set to open
        if (res.value === "Yes") {
          await setResult(RiskData);
        } else if (res.value === "No") {
          await setResult(NoRiskData);
        }
        
        //save in mongo db
        await fetch(`${backendURL}/saveMedicalData`, {
          method: "POST",
          body: medCheckupData(values, res.value),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            // console.log(res); // saved ya non saved
            setOpenDialog(true);
            setSuccessMsg("Checkup data saved successfully");
          })
          .catch((err) => setErrorMsg("Oops! Your checkup details could not be saved"));
      })
      .catch((err) => {
        setErrorMsg(errorData);
      })
      .finally(() => {
        setOpen(false); //loading false
      });
  };

  return (
    <>
      {errorMsg !== "" && <SnackbarElem sev="error" msg={errorMsg} clearMsg={setErrorMsg} />}
      <Form submitFn={handleSubmit} />
    </>
  );
};

export default Prediction;
