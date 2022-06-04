import React, { useState } from "react";
import { errorData, NoRiskData, RiskData } from "../utils/resultData";
import { urlList } from "../utils/urlLinks";
import Form from "./Form";
import Snackbar from "./Snackbar";

const Prediction = ({ setOpenDialog, setOpen, setResult }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const createForm = (formData, values) => {
    formData.append("age", values.age);
    formData.append("sex", values.sex);
    formData.append("cp", values.chestPainType);
    formData.append("trestbps", values.restingBloodPressure);
    formData.append("chol", values.cholestrol);
    formData.append("fbs", values.fastingBloodSugar);
    formData.append("restecg", values.ecg);
    formData.append("thalach", values.heartRate);
    formData.append("exang", values.angina);
    formData.append("thal", values.thal);
  };

  const medCheckupData = (values, result) =>
    JSON.stringify({
      email: JSON.parse(localStorage.getItem("loginData")).email,
      age: values.age,
      sex: values.sex,
      chestPainType: values.chestPainType,
      pressure: values.restingBloodPressure,
      cholestrol: values.cholestrol,
      sugar: values.fastingBloodSugar,
      ecg: values.ecg,
      heartRate: values.heartRate,
      angina: values.angina,
      thal: values.thal,
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
    var formData = new FormData();
    createForm(formData, values); // form created
    // values from Form state - all input values
    // predicturl -> ml model api call
    fetch(urlList.predictUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log(res); // res obj = {message,value}
        //prediction dialog set to open
        if (res.value === "Yes") {
          await setResult(RiskData);
        } else if (res.value === "No") {
          await setResult(NoRiskData);
        }
        setOpenDialog(true);
        //mongo db save korar api
        await fetch(urlList.saveMedUrl, {
          method: "POST",
          body: medCheckupData(values, res.value),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res); // saved ya non saved
            setSuccessMsg("Checkup data saved successfully");
          })
          .catch((err) => setErrorMsg("Oops! Your checkup details could not be saved"));
      })
      .catch((err) => {
        setErrorMsg("Sorry! The prediction could not be completed.");
      })
      .finally(() => {
        setOpen(false); //loading false
      });
  };

  return (
    <>
      {errorMsg !== "" && <Snackbar sev="error" msg={errorMsg} clearMsg={setErrorMsg} />}
      {successMsg !== "" && <Snackbar sev="success" msg={successMsg} clearMsg={setSuccessMsg} />}
      <Form submitFn={handleSubmit} />
    </>
  );
};

export default Prediction;
