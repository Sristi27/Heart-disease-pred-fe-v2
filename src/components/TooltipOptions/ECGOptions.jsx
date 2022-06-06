import { Stack, Typography } from "@mui/material";

const ECGOptions = (
  <Stack direction="column" spacing={2}>
    <Typography variant="subtitle1" color="inherit">
      Eco-cardiogram Results
    </Typography>
    <Typography variant="caption">
      Resting ECG is used to assess known cardiovascular diseases, to detect
      previously undiagnosed cardiovascular diseases, and to provide a baseline
      standard against which to measure changes in the postoperative period.
      {/* {elements.ecg.map((elem,index) => (
            <Stack spacing={1} direction="row" key={elem.label}>
            <Typography variant="subtitle2">{index+1}. {elem.label}:</Typography>
            <Typography variant="body2">{elem.desc}</Typography>
          </Stack>
        ))} */}
    </Typography>
  </Stack>
);

export default ECGOptions;
