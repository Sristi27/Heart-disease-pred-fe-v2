import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { 
  Button, 
  Backdrop, 
  Dialog, 
  Box,
  DialogActions,
  DialogContent, 
  DialogContentText,
  Typography,
  DialogTitle, 
  Grid,
  CircularProgress,
  Slide,
} from "@material-ui/core";
import resultimg from "./../images/resultimg.jpeg";
import Prediction from "./Prediction";

const useStyles = makeStyles((theme) => ({
  inputs: {
    width: "85%",
    margin: "0 auto",
    marginBottom:'8px'
  },
  root:
{
  display:'flex',
  alignItems:'center'
},
div:
{
  width:"100%",
  flexGrow:1
},
  form: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
  },
  image: {
    width: "40%",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 60,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const Checkup = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
 
  const [result, setResult] = useState({
    title: "",
    content: "",
    status: "",
  });

  const handleClose = () => {
    setOpenDialog(false);
  };
 
  return (
    <Box pt={2} pb={2}> 
        <Prediction 
        setOpenDialog={setOpenDialog} setOpen={setOpen}
        setResult={setResult}/>  
       <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress />
        <Typography variant="h5">Loading....</Typography>
      </Backdrop>

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
            <h3>{result.title}</h3>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {result.content}
                <img src={resultimg} width="320px" height="220px" />
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
