import { Stack, Typography } from "@mui/material";
import { elements } from "../FormElements/contents";

const ThalassemiaOptions = (
  <Stack direction="column" spacing={2}>
    <Typography variant="subtitle1" color="inherit">
      Thalassemia
    </Typography>
    <Typography variant="caption">
      Thalassemia is an inherited blood disorder characterised by less
      oxygen-carrying protein (haemoglobin) and fewer red blood cells in the
      body than normal.
    </Typography>
    <Typography variant="caption">
      In severe beta thalassemia, both anemia and iron overload can damage the
      heart and cause problems like:
      <ul>
        <li>Fast heartbeat</li>
        <li>Abnormal heartbeat called arrhythmia</li>
        <li>Congestive heart failure, when the heart can't pump enough</li>
        <li>Blood Swelling of the membrane around the heart, called pericarditis</li>
      </ul>
    </Typography>
    {/* <div>
      {elements.thal.map((elem, index) => (
        <Stack spacing={1} direction="row" key={elem.label}>
          <Typography variant="subtitle2">
            {index + 1}. {elem.label}:
          </Typography>
          <Typography variant="body2">{elem.desc}</Typography>
        </Stack>
      ))}
    </div> */}
  </Stack>
);

export default ThalassemiaOptions;
