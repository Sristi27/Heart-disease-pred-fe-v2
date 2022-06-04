import { Stack, Typography } from "@mui/material";
import { elements } from "../FormElements/contents";

const ThalassemiaOptions = (
  <>
    <Typography variant="subtitle1" color="inherit">
      Thalassemia
    </Typography>
    <div>
      {elements.thal.map((elem, index) => (
        <Stack spacing={1} direction="row" key={elem.label}>
          <Typography variant="subtitle2">
            {index + 1}. {elem.label}:
          </Typography>
          <Typography variant="body2">{elem.desc}</Typography>
        </Stack>
      ))}
    </div>
  </>
);

export default ThalassemiaOptions;
