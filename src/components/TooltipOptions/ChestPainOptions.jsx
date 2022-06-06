import { Stack, Typography } from "@mui/material";
import { elements } from "../FormElements/contents";

const ChestPainOptions = (
  <Stack direction="column" spacing={2}>
    <Typography variant="subtitle1" color="inherit">
      Chest Pain Type
    </Typography>
    <Typography variant="caption">
      Typical (classic) angina chest pain consists of
      <ol>
        <li>Substernal chest pain or discomfort </li>
        <li>Provoked by exertion or emotional stress</li>
        <li>Relieved by rest or nitroglycerine (or both)</li>
      </ol>
    </Typography>
    <Typography variant="caption">
      Atypical (probable) angina chest pain applies when 2 out of 3 criteria of
      classic angina are present.
    </Typography>
    <Typography variant="caption">
      Non-specific(non-anginal) chest pain: If ≤ 1 of the criteria of classic
      angina is present, symptoms are classified as non-specific.
    </Typography>
    {/* <div>
      {elements.chestPain.map((elem,index) => (
        <Stack spacing={1} direction="row" key={elem.label}>
          <Typography variant="subtitle2">{index+1}. {elem.label}:</Typography>
          <Typography variant="body2">{elem.desc}</Typography>
        </Stack>
      ))}
    </div> */}
  </Stack>
);

export default ChestPainOptions;
