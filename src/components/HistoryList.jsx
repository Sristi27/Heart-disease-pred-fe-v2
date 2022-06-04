import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import {
  Button,
  Backdrop,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Slide,
} from "@material-ui/core";
import moment from "moment";
import { Link } from "react-router-dom";
import { IconButton, Stack } from "@mui/material";
import HistoryDetail from "./HistoryDetail";
import { elements } from "./FormElements/contents";
import Snackbar from "./Snackbar";

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HistoryList = () => {
  const id = useParams().id;

  const [isLoading, setIsLoading] = useState(true);
  const [historyData, setHistoryData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [current, setCurrent] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  const handleClose = () => setOpenDialog(false);

  useEffect(() => {
    const fetchHistory = async () => {
      await fetch(`http://localhost:5000/getMedicalData/${id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          setHistoryData(res.history);
        })
        .catch((err) => {
          console.log(err);
          setErrorMsg("Sorry! We could not fetch your checkup history.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchHistory();
  }, []);

  return (
    <Box mt={5}>
      {errorMsg !== "" && (
        <Snackbar sev="error" msg={errorMsg} clearMsg={setErrorMsg} />
      )}
      {isLoading && (
        <Backdrop sx={{ color: "white" }} open={isLoading}>
          <Stack direction="row" spacing={2}>
            <CircularProgress />
            <Typography variant="h6">Loading....</Typography>
          </Stack>
        </Backdrop>
      )}
      {!isLoading && historyData.length == 0 && (
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
                        {moment(row.date).format("DD MMM,YYYY")}
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
                          "Negative"
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
          TransitionComponent={Transition}
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
                  {moment(current.date).format("DD MMM,YYYY")}
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
