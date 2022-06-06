import React from "react";
import { Typography } from "@material-ui/core";
import { Stack } from "@mui/material";

const BloodPressureOptions =  (
  <Stack direction="column" spacing={2}>
    <Typography variant="subtitle1">Blood Pressure</Typography>
    <Typography variant="caption">
      Blood pressure readings are given in two numbers.
      <ol>
        <li>
          The top number is the maximum pressure the heart exerts while beating
          (systolic pressure).
        </li>
        <li>
          The bottom number is the amount of pressure in the arteries between
          beats (diastolic pressure).
        </li>
      </ol>
    </Typography>
  </Stack>
);

export default BloodPressureOptions;
