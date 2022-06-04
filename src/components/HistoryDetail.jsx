import { makeStyles } from "@material-ui/core";
import { Stack } from "@mui/material";
import React from "react";
import { elements } from "./FormElements/contents";

const HistoryDetail = ({ current }) => {
  return (
    <Stack direction="row" spacing={11} sx={{ width: "500px" }} pl={3}>
      <Stack direction="column" spacing={3} sx={{ fontWeight: "bold" }}>
        <span>Age</span>
        <span>Gender</span>
        <span>Chest Pain Type</span>
        <span>Blood Pressure</span>
        <span>Cholestrol Levels</span>
        <span>Fasting Blood Sugar</span>
        <span>ECG Results</span>
        <span>Heart Rate</span>
        <span>Angina</span>
        <span>Thalassemia</span>
        <span>Result</span>
      </Stack>
      <Stack direction="column" spacing={3}>
        <span>{current.age}</span>
        <span>
          {
            elements.gender.filter(
              (elem) => elem.value === Number(current.sex)
            )[0]?.label
          }
        </span>
        <span>
          {
            elements.chestPain.filter(
              (elem) => elem.value === Number(current.chestPainType)
            )[0]?.label
          }
        </span>
        <span>{current.pressure} mm Hg</span>

        <span>{current.cholestrol} mg/dl</span>

        <span>
        {
            elements.sugar.filter(
              (elem) => elem.value === Number(current.sugar)
            )[0]?.desc
          }
        </span>

        <span>
          {
            elements.ecg.filter((elem) => elem.value === Number(current.ecg))[0]
              ?.label
          }
        </span>
        <span>{current.heartRate} bpm</span>
        <span>
          {
            elements.angina.filter(
              (elem) => elem.value === Number(current.angina)
            )[0]?.label
          }
        </span>
        <span>
          {
            elements.thal.filter(
              (elem) => elem.value === Number(current.thal)
            )[0]?.label
          }
        </span>
          {current.result === "Yes" && 
          <span style={{color:'red'}}><b>Heart disease risk detected</b></span>}
          {current.result === "No" && 
          <span style={{color:'green'}}><b>No heart disease risk detected</b></span>}
      </Stack>
    </Stack>
  );
};

export default HistoryDetail;
