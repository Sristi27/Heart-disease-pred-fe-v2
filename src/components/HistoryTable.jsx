import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Dialog, makeStyles, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import {
  Button,
  Backdrop,
  Box,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  CircularProgress,
  Slide,
} from "@material-ui/core";
import moment from "moment";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  historyRoot: {
    paddingTop: "30px",
  },
  tableRoot: {
    padding: "0 38px",
    marginTop: "30px",
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  noHistory: {
    marginTop: "50px",
    fontWeight: "light",
  },
  dialogContent: {
    width: "500px",
    justifyContent: "space-around",
    display: "flex",
  },
  labels: {
    "& div": {
      marginBottom: "20px",
      fontWeight:'bold'
    },
  },
  labelResults: {
    "& div": {
      marginBottom: "20px",
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HistoryTable = () => {
  const classes = useStyles();
  const id = useParams().id;
  console.log(id);
  const [loading, setLoading] = useState(true);
  const [historyData, setHistoryData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [current, setCurrent] = useState();
  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchHistory = async () => {
      await fetch(`http://localhost:5000/getMedicalData/${id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setLoading(false);
          setHistoryData(res.history);
        })
        .catch((err) => alert(err));
    };
    fetchHistory();
  }, []);

  return (
    <div className={classes.historyRoot}>
      {!historyData ? (
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress />
          <Typography variant="h5">Loading....</Typography>
        </Backdrop>
      ) : (
        <>
          <Typography variant="h4" style={{ textDecoration: "underline",marginBottom:'40px' }}>
            Checkup History Till Date
          </Typography>
          <div className={classes.tableRoot}>
            {historyData.length > 0 ? (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 550 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Age</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell>Blood Pressure</TableCell>
                      <TableCell>Heart Rate</TableCell>
                      <TableCell>Fasting Sugar more than 120?</TableCell>
                      <TableCell>Cholestrol</TableCell>
                      <TableCell>Result</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {historyData.map((row, idx) => (
                      <TableRow
                        key={idx}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {moment(row.date).format("L")}
                        </TableCell>
                        <TableCell>{row.age}</TableCell>
                        <TableCell>
                          {row.sex == "0" ? "Male" : "Female"}
                        </TableCell>
                        <TableCell>{row.pressure} mm Hg</TableCell>
                        <TableCell>{row.heartRate} bpm</TableCell>
                        <TableCell algin="center">
                          {row.sugar == "0" ? "No" : "Yes"}
                        </TableCell>
                        <TableCell>{row.cholestrol}</TableCell>
                        <TableCell>{row.result}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => {
                              setCurrent(row);
                              setOpenDialog(true);
                            }}
                          >
                            View more{" "}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <div className={classes.noHistory}>
                <h2>No checkup History yet</h2>
                <div>
                  <Link
                    to={{ pathname: `/checkup/${id}` }}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="contained" color="primary" size="sm">
                      Click to Checkup
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {current && (
        <Dialog
          open={openDialog}
          TransitionComponent={Transition}
          keepMounted
          maxWidth="lg"
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <div style={{margin:'22px'}}>
              <label style={{marginRight:'20px'}}>Date:</label>
              <span>{moment(current.date).format("L")}</span>
              </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div className={classes.dialogContent}>
                <div className={classes.labels}>
                  <div>Age</div>
                  <div>Gender</div>
                  <div>Chest Pain Type</div>
                  <div>Blood Pressure</div>
                  <div>Cholestrol Levels</div>
                  <div> Fasting Blood Sugar</div>
                  <div>ECG Results </div>
                  <div>Heart Rate </div>
                  <div>Angina</div>
                  <div>Thalassemia</div>
                  <div> Result</div>
                </div>
                <div className={classes.labelResults}>
                  <div> {current.age} </div>
                  <div>
                    {" "}
                    {current.sex == "0" && <div>Male</div>}
                    {current.sex == "1" && <div>Female</div>}
                  </div>
                  <div>
                    {" "}
                    {current.chestPainType == "0" && <div>Typical Angina</div>}
                    {current.chestPainType == "1" && <div>Atypical Angina</div>}
                    {current.chestPainType == "2" && (
                      <div>Non Anginal Pain</div>
                    )}
                    {current.chestPainType == "3" && <div>Asymptomatic</div>}
                  </div>

                  <div> {current.pressure} mm Hg </div>

                  <div> {current.cholestrol} mg/dl</div>

                  <div>
                    {current.sugar == "0" && (
                      <div>Fasting sugar less than 120 mg/dl</div>
                    )}
                    {current.sugar == "1" && (
                      <div>Fasting sugar greater than 120 mg/dl</div>
                    )}
                  </div>

                  {current.ecg == "0" && <div>Normal</div>}
                  {current.ecg == "1" && (
                    <div>Having ST-T wave abnormality</div>
                  )}
                  {current.ecg == "2" && (
                    <div>Probable or definite left ventricular hypertrophy</div>
                  )}

                  <div> {current.heartRate} bpm </div>

                  {current.angina == "0" && <div>No</div>}
                  {current.angina == "1" && <div>Yes</div>}

                  {current.thal == "3" && <div>Normal</div>}
                  {current.thal == "6" && <div>Fixed Defect</div>}
                  {current.thal == "7" && <div>Reversible Defect</div>}

                  <div> {current.result == 'Yes' && <div>Heart disease risk detected</div>}
                  {current.result == 'No' && <div>No heart disease risk detected</div>}
                   </div>
                </div>
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
    </div>
  );
};

export default HistoryTable;
