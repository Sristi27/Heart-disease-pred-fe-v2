import { Backdrop, Typography } from "@material-ui/core";
import { Stack, CircularProgress } from "@mui/material";
import React from "react";

const Loader = ({ open }) => {
  return (
    <Backdrop sx={{ color: "white" }} open={open}>
      <Stack direction="row" spacing={2}>
        <CircularProgress />
        <Typography variant="h6" style={{ color: "white", fontWeight: "bold" }}>
          Loading....
        </Typography>
      </Stack>
    </Backdrop>
  );
};

export default Loader;
