import React, {
  // Component,
  // Suspense,
  // useState,
  // useEffect,
  Fragment,
  useEffect
} from "react";
// import { Redirect, Route, Switch, HashRouter } from "react-router-dom";
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import NavBar from "../nav/NavBar";
// import { MdCardGiftcard } from "react-icons/md";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// import TableFooter from "@material-ui/core/TableFooter";
// import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
// import { FaUserAlt, FaRegBuilding } from "react-icons/fa";
// import { MdPhone } from "react-icons/md";
// import { IoMdMail, IoIosCard } from "react-icons/io";
// import Footer from "../footer/footer";
import { IoMdAperture, IoIosSend, IoIosTimer, IoIosCart } from "react-icons/io";
import { Redirect } from 'react-router-dom';
import {
  // InputGroup,
  // InputGroupAddon,
  // InputGroupText,
  // Progress,
  // Label,
  // CardImg,
  // Input,
  Jumbotron,
  Container,
  Row,
  Col,
  Card,
} from "reactstrap";
import { Sticky } from 'react-sticky';
import api from '../../config/api.json';
import server from '../../config/server.json';
import axios from 'axios';


function createData(title, date, price, situation, st) {
  return { title, date, situation, price, st };
}

const rows = [
  createData("ثبت درخواست", "1398/03/02", "1,500,00", "انجام شده", 0),
  createData("پیش پرداخت", "1398/04/06", "700,000", "انجام شده", 0),
  createData("قسط اول", "1398/05/01", "800,000", "واریز", 1),
  createData("قسط دوم", "1398/05/01", "650,000", "پرداخت", 0),
  createData("قسط سوم", "1398/05/01", "450,000", "انجام شده", 0),
  createData("قسط دوم", "1398/05/01", "500,000", "پرداخت", 0),
  createData("قسط سوم", "1398/05/01", "500,000", "انجام شده", 0),
  createData("قسط دوم", "1398/05/01", "500,000", "انجام شده", 0),
  createData("قسط سوم", "1398/05/01", "500,000", "انجام شده", 0),
  createData("قسط دوم", "1398/05/01", "500,000", "انجام شده", 0),
  createData("قسط دوم", "1398/05/01", "500,000", "انجام شده", 0),
  createData("قسط اول", "1398/05/01", "500,000", "انجام شده", 0),
  createData("قسط اول", "1398/05/01", "500,000", "انجام شده", 0)
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const labelStyle = {
  fontFamily: 'IRANYekanBold',
  color: '#575963',
}
const priceStyle = {
  fontFamily: 'IRANYekanBold',
  color: '#575963',
  fontSize: 15,
}
const useStylesPg = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(1),

  },
  table: {
    minWidth: 500,
    overflow: 'auto',
    border: "16px solid #f2f2f2"
  },
  tableBody: {
    height: 200,
    maxHeight: 400,
  },
  tableWrapper: {
    overflow: 'auto',
  },
}));
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));
function UserLoans(props) {
  const classes = useStyles();
  // const [count, setCount] = React.useState(0);
  // const [value, setValue] = React.useState("female");
  const classesPg = useStylesPg();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  // function handleChangePage(event, newPage) {
  //   setPage(newPage);
  // }

  // function handleChangeRowsPerPage(event) {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // }
  // const [state, setCheckbox] = React.useState({
  //   checkedA: true
  // });
  // const defaultProps = {
  //   bgcolor: "background.paper",
  //   m: 1,
  //   border: 1,
  //   style: { width: "5rem", height: "5rem" }
  // };
  // function handleChange(event) {
  //   setValue(event.target.value);
  // }
  // const handleCheckbox = name => event => {
  //   setCheckbox({ ...state, [name]: event.target.checked });
  // };
  // const GreenCheckbox = withStyles({
  //   root: {
  //     color: green[400],
  //     "&$checked": {
  //       color: green[600]
  //     }
  //   },
  //   checked: {}
  // })(props => <Checkbox color="default" {...props} />);

  useEffect(() => {
    fetch(`${server.afaam}${api.GetLoans}`, {
      headers: {        
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Token'),
      },
      method: 'get',
      // mode:'no-cors'
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }, [])

  const ColorButton = withStyles(theme => ({
    root: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700]
      }
    }
  }))(Button);

  const acc_tos = localStorage.getItem('_ac');
  if (acc_tos === '1') {
    return (
      <Fragment>
        <Sticky>
          {
            ({ style }) => (
              <header style={{ ...style, zIndex: 1000 }}>
                <NavBar />
              </header>
            )
          }
        </Sticky>
        <Jumbotron>
          <Container>
            <div
              className="rtl text-right"
              style={{ height: 105, background: "rgb(243,81,108)" }}
            >
              <p
                className="p-5"
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontFamily: "IRANYekanBold"
                }}
              >
                {" "}
                اتو بخار پاناسونیک{" "}
              </p>
            </div>
            <Card className="shadow rtl p-4">
              <Row>
                <Col md={{ size: 4 }}>
                  <Row className="mt-4">
                    <Col md={{ size: 6 }}>
                      <Card className="shadow text-center p-1 mt-2">
                        <Row>
                          <Col className="text-right mb-4" md={{ size: 12 }}>
                            <IoIosCart
                              size="30px"
                              className="m-2"
                              style={{ color: "#aba9e0" }}
                            />
                          </Col>
                        </Row>
                        <div className="mb-3">
                          <label style={labelStyle}>بهای محصول</label>
                          <div style={priceStyle}>15,000,000 تومان</div>
                        </div>
                      </Card>
                    </Col>
                    <Col md={{ size: 6 }}>
                      <Card className="shadow text-center p-1 mt-2">
                        <Row>
                          <Col className="text-right mb-4" md={{ size: 12 }}>
                            <IoMdAperture
                              size="30px"
                              className="m-2"
                              style={{ color: "#69cfbb" }}
                            />
                          </Col>
                        </Row>
                        <div className="mb-3">
                          <label style={labelStyle}>مبلغ دریافتی</label>
                          <div style={priceStyle}>5000,000 تومان</div>
                        </div>
                      </Card>
                    </Col>

                    <Col md={{ size: 6 }}>
                      <Card className="shadow text-center p-1 mt-2">
                        <Row>
                          <Col className="text-right mb-4" md={{ size: 12 }}>
                            <IoIosSend
                              size="30px"
                              className="m-2"
                              style={{ color: "#59b3f9" }}
                            />
                          </Col>
                        </Row>
                        <div className="mb-3">
                          <label style={labelStyle}>مبلغ هر قسط</label>
                          <div style={priceStyle}>1200,000 تومان</div>
                        </div>
                      </Card>
                    </Col>
                    <Col md={{ size: 6 }}>
                      <Card className="shadow text-center p-1 mt-2">
                        <Row>
                          <Col className="text-right mb-4" md={{ size: 12 }}>
                            <IoIosTimer
                              size="30px"
                              className="m-2"
                              style={{ color: "#f36079" }}
                            />
                          </Col>
                        </Row>
                        <div className="mb-3">
                          <label style={labelStyle}>وضعیت افام</label>
                          <div style={priceStyle}>تسویه شده</div>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col md={{ size: 8 }}>
                  <Paper className={`${classesPg.root} shadow`}>
                    <div className="overflow-auto" style={{ height: 507, maxHeight: 450 }}>
                      <Table className={`${classesPg.table} shadow`}>
                        <TableBody className={classesPg.tableBody}>
                          <TableRow
                            style={{ backgroundColor: "rgb(243,81,108)" }}
                          >
                            <TableCell align="center" component="th">تاریخ</TableCell>
                            <TableCell align="center" component="th" >عنوان</TableCell>
                            <TableCell align="center" component="th">مبلغ (تومان)</TableCell>
                            <TableCell align="center" component="th">وضعیت</TableCell>
                          </TableRow>
                          {rows.map((row,index) => {
                            if (row.st)
                              return (
                                <TableRow key={index}>
                                  <TableCell
                                  // className="text-right rtl"
                                  // component="th"
                                  // scope="row"
                                  >
                                    {row.date}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row.title}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row.price}
                                  </TableCell>
                                  <TableCell align="center">
                                    <ColorButton
                                      style={{
                                        fontFamily: "IRANYekanBold",
                                        fontSize: 10,
                                        display: "block",
                                        margin: "auto",
                                        color: "#fff",
                                        borderRadius: 25,
                                        outline: "none"
                                      }}
                                      variant="contained"
                                      color="primary"
                                      className={classes.margin}
                                    >
                                      واریز پیش پرداخت
                                    </ColorButton>
                                  </TableCell>
                                </TableRow>
                              );

                            return (
                              <TableRow key={index}>
                                <TableCell
                                // className="text-right rtl"
                                // component="th"
                                // scope="row"
                                >
                                  {row.date}
                                </TableCell>
                                <TableCell align="center">
                                  {row.title}
                                </TableCell>
                                <TableCell align="center">
                                  {row.price}
                                </TableCell>
                                <TableCell align="center">
                                  {row.situation}
                                </TableCell>
                              </TableRow>
                            );
                          })}

                          {emptyRows > 0 && (
                            <TableRow style={{ height: 48 * emptyRows }}>
                              <TableCell colSpan={6} />
                            </TableRow>
                          )}
                        </TableBody>
                        {/* <TableFooter>
                        <TableRow>
                          <TablePagination
                            rowsPerPageOptions={[5, 10]}
                            colSpan={4}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                              inputProps: { "aria-label": "rows per page" },
                              native: true
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                          />
                        </TableRow>
                      </TableFooter> */}
                      </Table>
                    </div>
                  </Paper>
                </Col>
              </Row>
            </Card>
          </Container>
        </Jumbotron>
      </Fragment>
    );
  } else {
    return <Redirect to='/account' />
  }
}
export default UserLoans;

const useStylesTable = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5)
  }
}));

function TablePaginationActions(props) {
  const classes = useStylesTable();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  function handleFirstPageButtonClick(event) {
    onChangePage(event, 0);
  }

  function handleBackButtonClick(event) {
    onChangePage(event, page - 1);
  }

  function handleNextButtonClick(event) {
    onChangePage(event, page + 1);
  }

  function handleLastPageButtonClick(event) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
            <KeyboardArrowLeft />
          )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
            <KeyboardArrowRight />
          )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
