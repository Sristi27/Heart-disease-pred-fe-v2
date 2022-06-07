import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "react-router-dom";
import { Stack, tableCellClasses, styled } from "@mui/material";
import {
  Button, Box, Dialog, Typography,
  Backdrop, Table,
  DialogActions,TableContainer, Paper, TableCell,
  DialogContent,TableHead, TableBody,
  DialogContentText, TableRow,
  DialogTitle, IconButton,
  CircularProgress,
} from "@material-ui/core";
import moment from "moment";
import { Link } from "react-router-dom";
import { elements } from "./FormElements/contents";
import HistoryDetail from "./HistoryDetail";
import SnackbarElem from "./Snackbar";
import { fontWeight } from "@mui/system";
import Loader from "./Loader";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


const HistoryList = () => {
  const {id} = useParams();
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  console.log(backendURL)

  const [isLoading, setIsLoading] = useState(true);
  const [historyData, setHistoryData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [current, setCurrent] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  const handleClose = () => setOpenDialog(false);

  useEffect(() => {
    const fetchHistory = async () => {
      await fetch(`${backendURL}/getMedicalData/${id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setHistoryData(res.history);
        })
        .catch(() => setErrorMsg("Sorry! We could not fetch your checkup history."))
        .finally(() => setIsLoading(false))
    };
    fetchHistory();
  }, [id]);

  return (
    <Box mt={5}>
      {errorMsg !== "" && (
        <SnackbarElem sev="error" msg={errorMsg} clearMsg={setErrorMsg} />
      )}
      {isLoading && <Loader open={isLoading} />}
      {!isLoading && historyData.length === 0 && (
        <Stack mt={3} direction="row" spacing={3} justifyContent="center" alignItems="center">
          <Typography variant="h5">
            No checkup history yet
          </Typography>
          <Link to={{ pathname: `/checkup/${id}` }} className="navbarLinks">
            <Button
              variant="outlined"
              color="secondary"
              size="large"
            >
              Checkup
            </Button>
          </Link>
        </Stack>
      )}
      {!isLoading && historyData.length > 0 && (
        <>
          <Typography
            variant="h4"
            style={{ textDecoration: "underline", marginBottom: "40px" }}
          >
            Checkup History Till Date
          </Typography>
          <Box mt={5} p={5} pt={0}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 550 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell>Age</StyledTableCell>
                    <StyledTableCell>Gender</StyledTableCell>
                    <StyledTableCell>Blood Pressure</StyledTableCell>
                    <StyledTableCell>Heart Rate</StyledTableCell>
                    <StyledTableCell>Fasting Blood Sugar</StyledTableCell>
                    <StyledTableCell>Cholestrol</StyledTableCell>
                    <StyledTableCell>Result</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historyData.map((row, idx) => (
                    <StyledTableRow
                      key={idx}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {moment(row.date).format("DD MMM,YYYY h:mm a")}
                      </StyledTableCell>
                      <StyledTableCell>{row.age}</StyledTableCell>
                      <StyledTableCell>
                        {
                          elements.gender.filter(
                            (elem) => elem.value === Number(row.sex)
                          )[0]?.label
                        }
                      </StyledTableCell>
                      <StyledTableCell>{row.pressure} mm Hg</StyledTableCell>
                      <StyledTableCell>{row.heartRate} bpm</StyledTableCell>
                      <StyledTableCell algin="center">
                        {
                          elements.sugar.filter(
                            (elem) => elem.value === Number(row.sugar)
                          )[0]?.desc
                        }
                      </StyledTableCell>
                      <StyledTableCell>{row.cholestrol} mg/dl</StyledTableCell>
                      <StyledTableCell>
                        {row.result === "No" ? (
                          <b style={{ color: "green", fontWeight:'normal'}}>Negative</b>
                        ) : (
                          <b style={{ color: "red" }}>Positive</b>
                        )}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => {
                            setCurrent(row);
                            setOpenDialog(true);
                          }}
                        >
                          View more
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
      )}

      {current && (
        <Dialog
          open={openDialog}
          keepMounted
          maxWidth="lg"
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <Stack
              direction="row"
              justifyContent="space-between"
              mt={2}
              mb={3}
              pl={3}
              alignItems="center"
            >
              <Stack spacing={3} direction="row">
                <Typography variant="h5">Date - </Typography>
                <Typography variant="h5">
                  {moment(current.date).format("DD MMM,YYYY h:mm a")}
                </Typography>
              </Stack>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{ color: (theme) => theme.palette.grey[500] }}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <HistoryDetail current={current} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default HistoryList;
