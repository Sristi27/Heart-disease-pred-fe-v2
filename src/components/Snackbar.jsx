import { Collapse, IconButton, Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const SnackbarElem = ({ sev, msg, clearMsg, widthProp }) => {
  const [open, setOpen] = useState(true);
  const handleClose = () =>
  {
    setOpen(false);
    clearMsg('');
  }
  useEffect(()=>
  {
    if(open)
    {
      setTimeout(()=>setOpen(false),[6000]);
    }
  },[open])

  return (
    //  <Snackbar open={open} style={{ top:'30px', position:'absolute'}}
    //  autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:'center' }} >
    //     <Alert variant="filled"  onClose={handleClose} severity={sev} sx={{ width: '100%' }}>
    //       {msg}
    //     </Alert>
    //   </Snackbar>
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
              onClick={handleClose}
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

export default SnackbarElem;
