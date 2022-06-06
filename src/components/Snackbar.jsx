import { Collapse, IconButton } from "@material-ui/core";
import { Alert } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const Snackbar = ({ sev, msg, clearMsg, widthProp }) => {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ width:`${widthProp ? widthProp : '35%'}`, margin: '0 auto'}}>
      <Collapse in={open}>
        <Alert
          variant="filled"
          severity={sev}
          style={{fontSize:'16px'}}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
                clearMsg('');
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {msg}
        </Alert>
      </Collapse>
    </div>
  );
};

export default Snackbar;
