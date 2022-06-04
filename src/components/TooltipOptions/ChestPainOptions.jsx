import { Stack, Typography } from "@mui/material";
import { elements } from "../FormElements/contents";

const ChestPainOptions = (
  <>
    <Typography variant="subtitle1" color="inherit">
      Chest Pain Type
    </Typography>
    <div>
      {elements.chestPain.map((elem,index) => (
        <Stack spacing={1} direction="row" key={elem.label}>
          <Typography variant="subtitle2">{index+1}. {elem.label}:</Typography>
          <Typography variant="body2">{elem.desc}</Typography>
        </Stack>
      ))}
    </div>
  </>
);

export default ChestPainOptions;
