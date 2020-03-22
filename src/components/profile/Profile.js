import React, { useState, useEffect, Fragment } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import NavBar from '../nav/NavBar';
import {
  InputGroup,
  InputGroupAddon,
  Jumbotron,
  Progress,
  Input,
  Container,
  Row,
  Col,
  Label,
  CardImg,
} from 'reactstrap';
import { FaUserAlt, FaRegBuilding } from "react-icons/fa";
import { MdPhone } from "react-icons/md";
import { IoMdMail, IoIosCard } from "react-icons/io";
import Footer from '../footer/footer';
import { connect } from 'react-redux';
import { getProfileInfo, updateProfileInfo } from '../../redux/profile/actions/profile.action';
import moment from 'jalali-moment';
import {
  persianNumberCurrency,
  percenageOfTwoDate,
  toast_info,
  toast_error,
  currencyWithString
} from '../common/funcComponents/FuncComponent';
import Loading from '../common/loading/Loading.component';
import { Sticky } from 'react-sticky';
// import PropTypes from 'prop-types';



//////////////////////////////////////////
//******* material-ui config ***********//
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));
//******* material-ui config ***********//
//////////////////////////////////////////


const Profile = (props) => {
  ///////////////////////////////////////////
  //*********** state & props ************//
  const {
    accept_tos,
    credit,
    credit_start_time,
    current_time,
    credit_deadline,
    max_credit,
    email,
    first_name,
    last_name,
    organization,
    phone,
    sheba_number,
    prefer,
    // address,
    // current_loans,
    // error,
  } = props.profile;

  const [state, setState] = useState({
    checkedA: false,
    radioCheck: '',
    orgName: '',
    profileName: '',
    profileFamily: '',
    profileMobile: '',
    profileSheba: '',
    profileEmail: '',
    creditPercent: 0
  });
  //*********** state & props ************//
  /////////////////////////////////////////


  //////////////////////////////////////
  //*********** handlers ************//
  const handleCheckbox = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleOrg = (e) => {
    setState({ ...state, orgName: e.target.value });
  };

  const handleRadios = (r) => {
    setState({ ...state, radioCheck: r });
  };

  const handleProfileName = (e) => {
    setState({ ...state, profileName: e.target.value });
  };

  const handleProfileFamily = (e) => {
    setState({ ...state, profileFamily: e.target.value });
  };

  const handleProfileEmail = (e) => {
    setState({ ...state, profileEmail: e.target.value });
  };

  const handleProfileMobile = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    let numberRegex = /^\d+$/g;
    if (val !== "") {
      if (numberRegex.test(val)) {
        setState({ ...state, profileMobile: val });
      } else {

      }
    } else {
      setState({ ...state, profileMobile: '' });
    }
  };

  const handleProfileSheba = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    let numberRegex = /^\d+$/g;
    if (val !== "") {
      if (numberRegex.test(val)) {
        setState({ ...state, profileSheba: val });
      } else {

      }
    } else {
      setState({ ...state, profileSheba: '' });
    }
  };

  const handleChangeProfile = () => {
    if (state.checkedA) {
      props.updateProfile(state);
    } else {
      toast_error('تایید شرایط و قوانین سایت الزامی است');
    }
  }
  //*********** handlers ************//
  //////////////////////////////////////


  ///////////////////////////////////////////
  //*********** customization ************//
  const classes = useStyles();
  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })(props => <Checkbox color="default" {...props} />);
  const ColorButton = withStyles(theme => ({
    root: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
  }))(Button);
  //*********** customization ************//
  /////////////////////////////////////////


  /////////////////////////////////////
  //*********** effects ************//
  useEffect(() => {
    props.getProfile();
  }, []);

  useEffect(() => {
    if (accept_tos !== undefined ||
      email !== undefined ||
      organization !== undefined ||
      first_name !== undefined ||
      last_name !== undefined ||
      phone !== undefined ||
      sheba_number !== undefined ||
      email !== undefined ||
      credit !== undefined ||
      max_credit !== undefined
    ) {
      setState({
        checkedA: accept_tos,
        radioCheck: prefer ? prefer : '',
        orgName: organization ? organization : '',
        profileName: first_name ? first_name : '',
        profileFamily: last_name ? last_name : '',
        profileMobile: phone ? phone : '',
        profileSheba: sheba_number ? sheba_number : '',
        profileEmail: email ? email : '',
        creditPercent: credit ? parseFloat(credit.replace(/\D/g, '')) * 100 / parseFloat(max_credit.replace(/\D/g, '')) : 0,
      });
      if (accept_tos) {
        localStorage.setItem('_ac', '1');
      } else {
        localStorage.removeItem('_ac');
        toast_info('توجه برای دسترسی به تمامی بخش ها باید  شرایط استفاده از سرویس را مطالعه کرده و بپذیرید');
      }
    }
  }, [accept_tos, prefer, organization, first_name, last_name, phone, sheba_number, email, credit, max_credit]);
  //*********** effects ************//
  ///////////////////////////////////


  ////////////////////////////////////////
  //*********** const & let ************//
  let percentDate = 0;
  let diffDays = null;
  let diffMonth = null;
  let begin_time = null;
  let deadline = null;
  let now = null;
  if (credit_deadline || current_time) {
    now = moment(current_time);
    begin_time = moment(credit_start_time);
    deadline = moment(credit_deadline);
    diffDays = deadline.diff(now, 'days');
    diffMonth = deadline.diff(now, 'month');
    percentDate = percenageOfTwoDate(begin_time, deadline, now);
  }
  //***********  const & let ************//
  ////////////////////////////////////////
  return (
    <Fragment>
      <Loading active={props.loading} />
      <Sticky>
        {
          ({ style }) => (
            <header style={{ ...style, zIndex: 1000 }}>
              <NavBar />
            </header>
          )
        }
      </Sticky>
      <Container className="mt-5">
        <Row >
          <Col className="rtl" md={{ size: 6 }}>

            <Jumbotron className="shadow p-3" style={{ background: '#fff', padding: 12 }}>
              <Row>
                <Col md={{ size: 6 }}>
                  <p className="" style={{ textAlign: "right", fontWeight: 400 }}>اعتبار و امتیاز</p>
                </Col>
                <Col md={{ size: 6 }}>
                  <ColorButton style={{ display: "block", margin: "auto", color: '#fff', borderRadius: 25, outline: "none" }} variant="contained" color="primary" className={classes.margin}>
                    <span className="second-font">چگونه اعتبارم را افزایش بدهم؟</span>
                  </ColorButton>
                </Col>
              </Row>
              <div className="mb-4" style={{ borderBottom: "1px dotted #ced4da", marginTop: 7 }}></div>
              <div className="px-5">
                <div>
                  <div className="text-right"><label>اعتبار شما در سرویس افام</label></div>
                  <div className="text-right"><label style={{ fontSize: 11, color: "grey" }}>این عدد هر 24 ساعت یکبار آپدیت می شود</label></div>
                  <Progress
                    className="mt-4"
                    color="success"
                    animated
                    value={credit && state.creditPercent}
                  />
                  <div className="text-left mt-1">
                    <span style={{ fontSize: 15, fontFamily: "IRANYekanBold", color: "green" }} >
                      <div style={{ direction: 'rtl', display: 'inline-block' }}>
                        {credit && currencyWithString(persianNumberCurrency(credit.replace(/\D/g, '')))}
                      </div>

                      <span style={{ display: 'inline-block', margin: 5 }}>از سقف</span>

                      <div style={{ direction: 'rtl', display: 'inline-block' }}>
                        {max_credit && currencyWithString(persianNumberCurrency(max_credit.replace(/\D/g, '')))}
                      </div>

                    </span>
                  </div>
                  <div className="text-right mt-5"><label>تاریخ اتمام دوره جاری</label></div>
                  <div className="text-right"><label style={{ fontSize: 11, color: "grey" }}>سازمان فعلی شما تا تاریخ <span>{credit_deadline && moment(credit_deadline, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</span> اعتبار شما را تضمین کرده است</label></div>
                  <Progress animated value={percentDate === Infinity ? 100 : percentDate} />
                  {diffDays < 0 || diffMonth < 0 ?
                    <div className="text-left mt-1">
                      <label style={{ fontSize: 15, color: "purple" }}>
                        اعتبار شما پایان یافته است
                      </label>
                    </div>
                    :
                    <div className="text-left mt-1">
                      <label style={{ fontSize: 15, color: "purple" }}>
                        <span>{diffDays} ماه و {diffMonth} روز</span> تا پایان دوره اعتبار جاری
                    </label>
                    </div>
                  }
                  <CardImg className="mt-4" bottom width="100%" src="/img/profile/eqo.png" alt="Card image cap" />
                </div>
              </div>
            </Jumbotron>
          </Col>
          <Col md={{ size: 6 }}>
            <Jumbotron className="shadow p-3" style={{ background: '#fff', padding: 12 }}>
              <p className="px-2" style={{ textAlign: "right", fontWeight: 400 }}>مشخصات کاربری</p>
              <div className="mb-4" style={{ borderBottom: "1px dotted #ced4da", marginTop: 7 }}></div>
              <div className="px-5">
                <Label style={{ float: "right" }} className="text-right" for="company">سازمان معرف</Label>
                <InputGroup>
                  <Input className="text-right" value={state.orgName} onChange={handleOrg} name="company" id="company" placeholder="مثال : دانشگاه آزاد واحد تهران مرکز" />
                  <InputGroupAddon addonType="append" ><FaRegBuilding className="input-icon-right" size="38px" /></InputGroupAddon>
                </InputGroup>

                <br />
                <div className="mb-4" style={{ borderBottom: "1px dotted #ced4da", marginTop: 7 }}>
                </div>
                <Label style={{ float: "right" }} className="text-right" for="userName">نام</Label>
                <InputGroup >
                  <Input className="text-right" value={state.profileName} onChange={handleProfileName} name="userName" id="userName" placeholder="مثال : محمد" />
                  <InputGroupAddon addonType="append"><FaUserAlt className="input-icon-right" size="38px" /></InputGroupAddon>
                </InputGroup>
                <br />
                <Label style={{ float: "right" }} className="text-right" for="lastName">نام و نام خانوادگی</Label>
                <InputGroup >
                  <Input className="text-right" value={state.profileFamily} onChange={handleProfileFamily} name="lastName" id="lastName" placeholder="مثال : سپهری" />
                  <InputGroupAddon addonType="append"><FaUserAlt className="input-icon-right" size="38px" /></InputGroupAddon>
                </InputGroup>
                <br />
                <Label style={{ float: "right" }} className="text-right" for="mobile">شماره موبایل</Label>
                <InputGroup >
                  <InputGroupAddon addonType="prepend"><MdPhone className="input-icon-left" size="38px" /></InputGroupAddon>
                  <Input className="text-left" value={state.profileMobile} onChange={handleProfileMobile} name="mobile" id="mobile" placeholder="09120000000" />
                </InputGroup>
                <br />
                <Label style={{ float: "right" }} className="text-right" for="Email">پست الکترونیک</Label>
                <InputGroup >
                  <InputGroupAddon addonType="prepend"><IoMdMail className="input-icon-left" size="38px" /></InputGroupAddon>
                  <Input className="text-left" value={state.profileEmail} onChange={handleProfileEmail} name="Email" id="Email" placeholder="example@gmail.com" />
                </InputGroup>
                <br />
                <Label style={{ float: "right" }} className="text-right" for="shabaNo">شماره شبا</Label>
                <InputGroup >
                  <InputGroupAddon addonType="prepend"><IoIosCard className="input-icon-left" size="38px" /></InputGroupAddon>
                  <Input className="text-left" value={state.profileSheba} onChange={handleProfileSheba} name="shabaNo" id="shabaNo" placeholder="شماره شبای خود را وارد کنید" />
                </InputGroup>
                <br />
              </div>
              <div className="mb-4" style={{ borderBottom: "1px dotted #ced4da", marginTop: 7 }}></div>

              <FormControl className="" style={{ display: "block", direction: "rtl", margin: "auto" }} component="fieldset" >
                <FormLabel className="second-font" component="legend" style={{ color: '#000' }}>ترجیح می دهم که بیشتر</FormLabel>
                <RadioGroup className="text-right mt-2 mr-3" aria-label="position" name="position" row>
                  <Col className="box-br m-0" md={{ size: 5, offset: 7 }}>
                    <FormControlLabel
                      value="end"
                      control={<Radio color="primary" value={state.radioCheck} checked={state.radioCheck === 1} onChange={() => handleRadios(1)} />}
                      label="سرمایه گذاری کنم"
                      labelPlacement="end"
                    />
                    <p className="second-font" style={{ fontSize: 11, textAlign: "justify" }}>
                      شما با سرمایه گذاری در صندوق افام سالیانه 20 درصد سود قطعی سرمایه گذاری دریافت میکنید. همچنین می توانید در طرح های قرض الحسنه به دیگران یاری برسانید.
                    </p>
                  </Col>
                  <Col className="p-0 m-0" md={{ size: 2 }} style={{ flex: '0 0 5.666667%' }}>
                  </Col>
                  <Col className="box-br m-0" md={{ size: 5, offset: 7 }}>
                    <FormControlLabel
                      value="start"
                      control={<Radio color="primary" value={state.radioCheck} checked={state.radioCheck === 2} onChange={() => handleRadios(2)} />}
                      label="خرید کنم"
                      labelPlacement="end"
                    />
                    <p className="second-font" style={{ fontSize: 11, textAlign: "justify" }}>
                      به کمک سرویس افام می توانید برای خرید کالاهای مختلف و استفاده از خدمات مورد نظر خود بدون استفاده از چک یا سفته در هر زمان و مکان خرید کنید.
                    </p>
                  </Col>

                </RadioGroup>
              </FormControl>
              <div className="my-4" style={{ borderBottom: "1px dotted #ced4da", marginTop: 7 }}></div>
              {
                accept_tos ?
                  null
                  :
                  <Container>
                    <FormControlLabel
                      control={
                        <GreenCheckbox
                          checked={state.checkedA}
                          onChange={handleCheckbox('checkedA')}
                          value="checkedA"
                        />
                      }
                      label="حریم خصوصی و شرایط استفاده از سرویس های سایت افام را مطالعه نموده و با کلیه موارد آن موافقم"
                      labelPlacement="start"
                    />
                  </Container>
              }
              <div className="mt-4" style={{ borderBottom: "1px dotted #ced4da", marginTop: 7 }}></div>

              <Fab style={{ display: "block", margin: "auto", outline: "none" }}
                variant="extended"
                size="large"
                color="primary"
                aria-label="submit"
                className={`${classes.margin} my-3`}
                onClick={handleChangeProfile}
              >
                <span style={{ fontFamily: "IRANYekanRegular" }}>ذخیره تغییرات</span>
              </Fab>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  profile: state.profile.profileData,
  loading: state.profile.loading,
  error: state.profile.error,
});

const mapDispatchToProps = (dispatch) => ({
  getProfile: () => {
    dispatch(getProfileInfo());
  },
  updateProfile: (newProfileData) => {
    dispatch(updateProfileInfo({
      accept_tos: newProfileData.checkedA,
      address: newProfileData.orgName,
      email: newProfileData.profileEmail,
      sms_number: newProfileData.profileMobile,
      last_name: newProfileData.profileFamily,
      first_name: newProfileData.profileName,
    }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);



//propTypes
// Profile.propTypes = {
//   InputGroup: {
//     direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
//     tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
//     size: PropTypes.string,
//     className: PropTypes.string
//   },

//   InputGroupAddOn: {
//     tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
//     addonType: PropTypes.oneOf(['prepend', 'append']).isRequired,
//     className: PropTypes.string
//   },

//   InputGroupButton: {
//     tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
//     addonType: PropTypes.oneOf(['prepend', 'append']).isRequired,
//     children: PropTypes.node,
//     groupClassName: PropTypes.string, // only used in shorthand
//     groupAttributes: PropTypes.object, // only used in shorthand
//     className: PropTypes.string
//   },
// }