import React, { useState } from "react";
import {
  Button,
  Dialog,
  Box,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import resultImg from "./../images/resultimg.jpeg";
import Prediction from "./Prediction";
import { useHistory, useParams } from "react-router-dom";
import Snackbar from "./Snackbar";
import Loader from "./Loader";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Checkup = () => {
  const history = useHistory();
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const {id} = useParams();
  
  const [result, setResult] = useState({
    title: "",
    content: "",
    status: "",
  });

  const handleClose = () => {
    setOpenDialog(false);
    history.push(`/history/${id}`);
  };

  return (
    <Box pt={2} pb={2}>
      <Prediction
        setSuccessMsg={setSuccessMsg}
        setOpenDialog={setOpenDialog}
        setOpen={setOpen}
        setResult={setResult}
      />
      <Loader open={open} />
      
      {/* for result  */}
      {result && (
        <Dialog
          open={openDialog}
          TransitionComponent={Transition}
          keepMounted
          maxWidth="sm"
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <div style={{width:'100%'}}>
              {successMsg !== "" && (
                <Snackbar
                  sev="success"
                  msg={successMsg}
                  clearMsg={setSuccessMsg}
                  widthProp="100%"
                />
              )}
              <h3>{result.title}</h3>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {result.content}
                <img alt="Dialog" 
                src={resultImg} width="320px" height="220px" />
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default Checkup;
