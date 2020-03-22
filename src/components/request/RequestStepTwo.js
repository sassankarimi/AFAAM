import React, { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  Jumbotron,
  Input,
  Label
} from "reactstrap";
import { Row, Col } from "reactstrap";
import { FaExclamationTriangle } from "react-icons/fa";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { connect } from 'react-redux';
import { updateLoanStart } from '../../redux/loan/actions/loan.actions';
import Loading from '../common/loading/Loading.component';
import moment from 'jalali-moment';
import { persianNumberCurrency, soon, currencyWithString } from '../common/funcComponents/FuncComponent';

const RequestStepTwo = props => {
  const [insurance, setInsurance] = useState(false);
  const handleInsurance = () => {
    soon();
    setInsurance(insurance);
  };
  // console.log('lone slices: ', props.loneSlices);
  const { loan } = props.purchaseAllInfo;
  const [reqPrice, setReqPrice] = useState(loan.min_ability);
  const [monthCount, setMonthCount] = useState(loan.min_slice_numbers);

  //مبلغ درخواستی
  const iOSBoxShadow =
    "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";
  const marks = [
    {
      value: 2000000
    },
    {
      value: 3000000
    },
    {
      value: 4000000
    }
  ];

  const IOSSlider = withStyles({
    root: {
      color: "#f64f69",
      height: 2,
      padding: "15px 0"
    },
    thumb: {
      height: 28,
      width: 3,
      backgroundColor: "#f64f69",
      boxShadow: iOSBoxShadow,
      marginTop: -10,
      marginLeft: 0,
      borderRadius: "initial",
      "&:focus,&:hover,&$active": {
        boxShadow:
          "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          boxShadow: iOSBoxShadow
        }
      }
    },
    active: {},
    valueLabel: {
      // left: "calc(-50% + 11px)",
      background: "#f64f69",
      borderRadius: 4,
      top: -35,
      left: "calc(-100% + -45px)",
      // fontSize: 9,
      minWidth: 100,
      paddingRight: 32,
      whiteSpace: 'nowrap',
      fontFamily: 'IRANYekanBold',
      fontSize: 10,
      padding: 5,
      "& *": {
        background: "transparent",
        color: "#fff"
      }
    },
    track: {
      height: 13,
      borderRadius: "4px 0 0 4px"
    },
    rail: {
      height: 13,
      opacity: 0.5,
      backgroundColor: "#bfbfbf",
      borderRadius: 4
    },
    mark: {
      backgroundColor: "#bfbfbf",
      height: 10,
      width: 1,
      marginTop: 10
    },
    markActive: {
      backgroundColor: "#f64f69"
    }
  })(Slider);

  //تعداد اقساط
  const PrettoSlider = withStyles({
    root: {
      color: "#f64f69",
      height: 8
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: "#f64f69",

      border: "2px solid #f64f69",
      marginTop: -8,
      marginLeft: -12,
      "&:focus,&:hover,&$active": {
        boxShadow: "inherit"
      }
    },
    active: {
      color: "#f64f69"
    },
    valueLabel: {
      left: "calc(-50% + 4px)"
    },
    track: {
      height: 8,
      borderRadius: 4,
      color: "#e1e3ef"
    },
    rail: {
      height: 8,
      borderRadius: 4,
      border: "1px solid #a09fa5",
      color: "#e1e3ef"
    }
  })(Slider);

  const iosSliderHandler = (e, val) => {
    setReqPrice(val);
    props.updateLoan({
      price: val,
      slice_numbers: monthCount,
      loan_id: loan.id,
      accept_loan: false
    });
  }

  const handleReqPriceInput = (e) => {
    // let val = parseFloat(e.target.value.replace(/\D/g, ''));
    // let numberRegex = /^\d+$/g;
    // if (val !== "") {
    //   if (numberRegex.test(val)) {
    //     setReqPrice(val);
    //   } else {
    //     return;
    //   }
    // } else {
    //   setReqPrice(loan.min_ability);
    // }
  }


  const handleMonthCount = (e, val) => {
    setMonthCount(val);
    props.updateLoan({
      price: reqPrice,
      slice_numbers: val,
      loan_id: loan.id,
      accept_loan: false
    });
  }

  const handleUpdatedLoanAccept = () => {
    props.updateLoan({
      price: reqPrice,
      slice_numbers: monthCount,
      loan_id: loan.id,
      accept_loan: true
    });
  }

  const handleMonthCountInput = (e) => {
    // let val = e.target.value;
    // if (val !== "") {
    //   parseFloat(val.replace(/\D/g, ''));
    //   let numberRegex = /^\d+$/g;
    //   if (numberRegex.test(val)) {
    //     setMonthCount(val);
    //   } else {
    //     return;
    //   }
    // } else {
    //   setMonthCount(loan.min_slice_numbers);
    // }
  }


  // React.useEffect(() => {
  //   console.log(reqPrice);
  // }, [reqPrice])


  const formatingSliderValue = (val) => {
    return (
      <span className='slider-custom-label'>
        {`${persianNumberCurrency(val.toString())}`} تومان
    </span>);
  }


  // useEffect(() => {
  //   setMonthCount(val);

  // },[props.loneSlices]);


  //generate random hex color
  return (
    <>
      <Loading active={props.loading} />
      <Row style={{ direction: "rtl" }}>
        {/* تعیین مدل بازپرداخت */}
        <Col md={{ size: 6 }}>
          <Jumbotron
            className="shadow"
            style={{
              background: "#fff",
              width: "100%",
              padding: 0,
              display: "inline-block"
            }}
          >
            <div className="p-5">
              <p
                className="px-2 jumbo-header-txt"
                style={{
                  textAlign: "right",
                  fontWeight: 600,
                  direction: "rtl"
                }}
              >
                تعیین مدل بازپرداخت
              </p>
              <div
                className="mb-4"
                style={{ borderBottom: "1px dotted #ced4da", marginTop: 7 }}
              ></div>

              <div className="px-5"></div>
              <Label
                style={{ float: "right" }}
                className="text-right"
                for="company"
              >
                مبلغ درخواستی
              </Label>
              <br />
              <div style={{ width: "100%", textAlign: "right" }}>
                <Row style={{ width: "100%" }}>
                  <Col md={{ size: 12 }}>
                    <div
                      className="input-detail-container"
                      style={{ width: 160, direction: "ltr" }}
                    >
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          تومان
                        </InputGroupAddon>
                        <Input
                          className="text-left"
                          name="price"
                          value={persianNumberCurrency(reqPrice.toString())}
                          style={{ cursor: 'default' }}
                          onChange={handleReqPriceInput}
                        />
                      </InputGroup>
                    </div>
                  </Col>
                  <Col md={{ size: 12 }}>
                    {
                      props.loneSlices.length > 0 ?
                        <IOSSlider
                          aria-label="ios slider"
                          defaultValue={parseFloat(reqPrice)}
                          marks={marks}
                          valueLabelDisplay="on"
                          min={parseFloat(props.loanResult.min_ability)}
                          max={parseFloat(props.loanResult.max_ability)}
                          onChangeCommitted={iosSliderHandler}
                          step={10000}
                          valueLabelFormat={formatingSliderValue}
                        />
                        :
                        <IOSSlider
                          aria-label="ios slider"
                          defaultValue={parseFloat(reqPrice)}
                          marks={marks}
                          valueLabelDisplay="on"
                          min={parseFloat(loan.min_ability)}
                          max={parseFloat(loan.max_ability)}
                          onChangeCommitted={iosSliderHandler}
                          step={10000}
                          valueLabelFormat={formatingSliderValue}
                        />
                    }
                    {
                      props.loneSlices.length > 0 ?
                        <>
                          <span className='iosSlider-infoBox iosSlider-infoBox-min'> حداقل {currencyWithString(persianNumberCurrency(props.loanResult.min_ability))}</span>
                          <span className='iosSlider-infoBox iosSlider-infoBox-max'> حداکثر {currencyWithString(persianNumberCurrency(props.loanResult.max_ability))} </span>
                        </>
                        :
                        <>
                          <span className='iosSlider-infoBox iosSlider-infoBox-min'> حداقل {currencyWithString(persianNumberCurrency(loan.min_ability))}</span>
                          <span className='iosSlider-infoBox iosSlider-infoBox-max'> حداکثر {currencyWithString(persianNumberCurrency(loan.max_ability))} </span>
                        </>
                    }
                  </Col>
                </Row>
              </div>

              <div className="px-5 mt-5"></div>
              <Label
                style={{ float: "right" }}
                className="text-right"
                for="company"
              >
                تعداد اقساط
              </Label>
              <br />
              <div style={{ width: "100%", textAlign: "right" }}>
                <Row className="txt-right" style={{ width: "100%" }}>
                  <Col md={{ size: 12 }}>
                    <div
                      className="input-detail-container"
                      style={{ width: 160, direction: "ltr" }}
                    >
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          ماه
                        </InputGroupAddon>
                        <Input
                          className="text-left"
                          name="month"
                          value={monthCount}
                          onChange={handleMonthCountInput}
                          style={{ cursor: 'default' }}
                        />
                      </InputGroup>
                    </div>
                  </Col>
                  <Col md={{ size: 12 }}>
                    {
                      props.loneSlices.length > 0 ?
                        <PrettoSlider
                          valueLabelDisplay="auto"
                          aria-label="pretto slider"
                          defaultValue={monthCount}
                          min={props.loanResult.min_slice_numbers}
                          max={props.loanResult.max_slice_numbers}
                          onChangeCommitted={handleMonthCount}
                        />
                        :
                        <PrettoSlider
                          valueLabelDisplay="auto"
                          aria-label="pretto slider"
                          defaultValue={monthCount}
                          min={loan.min_slice_numbers}
                          max={loan.max_slice_numbers}
                          onChangeCommitted={handleMonthCount}
                        />
                    }
                  </Col>
                </Row>
              </div>
              <div className="px-5 mt-5"></div>
              <div className="jumbo-info">
                <Row>
                  <Col md={{ size: 12 }}>
                    <div className="jumbo-info-right">
                      <span className="jumbo-info-right-icon">
                        <FaExclamationTriangle />
                      </span>
                      <span className="jumbo-info-right-txt">
                        با <strong>افزایش اعتبار</strong> میتوانید مبلغ درخواستی
                        و تعداد اقساط را افزایش دهید
                      </span>
                    </div>
                  </Col>
                  <Col md={{ size: 12 }}>
                    <div className="jumbo-info-left">
                      <button className="jumbo-info-left-btn jumbo-info-btn" onClick={() => soon()}>
                        راهنمای افزایش اعتبار
                      </button>
                    </div>
                  </Col>
                </Row>
              </div>

              <div
                className="mb-4 mt-5"
                style={{ borderBottom: "1px dotted #ced4da", marginTop: 7 }}
              ></div>
              <div className="insurance">
                <Row title='این بخش هنوز در دسترس نیست'>
                  <Col md={{ size: 6 }}>
                    <h3 className="insurance-title">بیمه پوشش حوادث</h3>
                    <p className="insurance-txt">
                      این بیمه فقط مختص خرید اجناس است. پس از انتخاب این گزینه و
                      پرداخت مبلغ مربوطه باید فاکتور رسمی خرید را برای ما ارسال
                      کنید
                    </p>
                  </Col>
                  <Col md={{ size: 6 }} style={{ paddingTop: 15 }}>
                    <div className="switch-box" onClick={handleInsurance}>
                      <div
                        className="switch-box-value"
                        style={{
                          userSelect: "none",
                          background: insurance ? "#34bfa2" : "#a09fa5",
                          right: insurance ? "initial" : 0,
                          left: insurance ? 0 : "initial"
                        }}
                      >
                        {insurance ? "بیمه شود" : "بیمه نشود"}
                      </div>
                    </div>
                    <div className="clearFix"></div>
                    <div className="insurance-price">
                      <span className="insurance-price-txt">
                        مبلغ ماهیانه 12,000 تومان
                      </span>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Jumbotron>
        </Col>
        {/* جدول زمان بندی پرداخت ها */}
        <Col md={{ size: 6 }}>
          <Jumbotron
            className="shadow"
            style={{
              background: "#fff",
              width: "100%",
              padding: 0,
              display: "inline-block"
            }}
          >
            <div className="p-5">
              <p
                className="px-2 jumbo-header-txt"
                style={{
                  textAlign: "right",
                  fontWeight: 600,
                  direction: "rtl"
                }}
              >
                جدول زمان بندی پرداخت ها
              </p>
              <div
                className="mb-4"
                style={{ borderBottom: "1px dotted #ced4da", marginTop: 7 }}
              ></div>

              <div className="px-5"></div>
              <div className="timing-table">
                <div className="timing-table-container customScroll">
                  <Row className="">
                    <Col md={{ size: 12 }}>
                      <div className="timing-table-item">
                        <div className="timing-table-item-txtBullet">
                          <span
                            className="timing-table-item-bullet"
                            style={{ background: 'green' }}
                          ></span>
                          <span className="timing-table-item-txt">
                            ثبت درخواست جدید
                          </span>
                        </div>
                        <span className="timing-table-item-date">
                          {
                            props.loneSlices.length > 0 ?
                              moment(props.loanResult.created_at, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')
                              :
                              moment(loan.created_at, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')
                          }
                        </span>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={{ size: 12 }}>
                      <div className="timing-table-item">
                        <div className="timing-table-item-txtBullet">
                          <span
                            className="timing-table-item-bullet"
                            style={{ background: 'red' }}
                          ></span>
                          <span className="timing-table-item-txt">
                            پرداخت پیش پرداخت
                          </span>
                        </div>
                        <span className="timing-table-item-date">
                          {
                            props.loneSlices.length > 0 ?
                              moment(props.loanResult.start_time, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')
                              :
                              moment(loan.start_time, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')
                          }
                        </span>
                      </div>
                    </Col>
                  </Row>
                  {props.loading ?
                    null
                    :
                    <>
                      {
                        props.loneSlices.length > 0
                          ?
                          props.loneSlices.map((slice, i) => {
                            let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
                            return (
                              <Row key={i}>
                                <Col md={{ size: 12 }}>
                                  <div className="timing-table-item">
                                    <div className="timing-table-item-txtBullet">
                                      <span
                                        className="timing-table-item-bullet"
                                        style={{ background: randomColor !== '#ffffff' ? randomColor : "#000" }}
                                      ></span>
                                      <span className="timing-table-item-txt">
                                        پرداخت {slice.title} : <div style={{ direction: 'ltr', display: 'inline-block' }}>{persianNumberCurrency(slice.price.toString())}</div> تومان
                                  </span>
                                    </div>
                                    <span className="timing-table-item-date">
                                      {moment(slice.pay_time, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}
                                    </span>
                                  </div>
                                </Col>
                              </Row>
                            )
                          })
                          :
                          loan.slices.map((slice, i) => {
                            let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
                            return (
                              <Row key={i}>
                                <Col md={{ size: 12 }}>
                                  <div className="timing-table-item">
                                    <div className="timing-table-item-txtBullet">
                                      <span
                                        className="timing-table-item-bullet"
                                        style={{ background: randomColor !== '#ffffff' ? randomColor : "#000" }}
                                      ></span>
                                      <span className="timing-table-item-txt">
                                        پرداخت {slice.title} : <div style={{ direction: 'ltr', display: 'inline-block' }}>{persianNumberCurrency(slice.price.toString())}</div> تومان
                              </span>
                                    </div>
                                    <span className="timing-table-item-date">
                                      {moment(slice.pay_time, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}
                                    </span>
                                  </div>
                                </Col>
                              </Row>
                            )
                          })
                      }
                    </>
                  }

                </div>
              </div>
            </div>
          </Jumbotron>
        </Col>
        {/* جدول مبالغ */}
        <Col md={{ size: 12 }}>
          <Jumbotron
            className="shadow"
            style={{
              background: "#fff",
              width: "100%",
              padding: 0,
              display: "inline-block"
            }}
          >
            <div className="request-information">
              <Row>
                <Col md={{ size: 4 }} className="request-information-right">
                  <Row>
                    <Col md={{ size: 12 }}>
                      <div className="request-item-info">
                        <div className="request-item-info-container">
                          <span className="request-item-info-txt">
                            مبلغ پیش پرداخت
                          </span>
                          <span className="request-item-info-subTxt">
                            4٪ مبلغ در خواستی
                          </span>
                          <span className="request-item-info-price request-item-info-priceOne">
                            {
                              props.loneSlices.length > 0 ?
                                `${persianNumberCurrency(props.loanResult.prepayment.toString())} تومان`
                                :
                                `${persianNumberCurrency(loan.prepayment.toString())} تومان`
                            }
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={{ size: 12 }}>
                      <div className="request-item-info">
                        <div className="request-item-info-container">
                          <span className="request-item-info-txt">
                            مبلغ هر قسط
                          </span>
                          <span className="request-item-info-subTxt">
                            مبلغ بازپرداخت در هر ماه
                          </span>
                          <span className="request-item-info-price request-item-info-priceTwo">
                            {
                              props.loneSlices.length > 0 ?
                                `${persianNumberCurrency(props.loanResult.slices[0].price.toString())} تومان`
                                :
                                `${persianNumberCurrency(loan.slices[0].price.toString())} تومان`
                            }
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={{ size: 12 }}>
                      <div className="request-item-info no-border">
                        <div className="request-item-info-container">
                          <span className="request-item-info-txt">
                            مبلغ کامل بازپرداخت
                          </span>
                          <span className="request-item-info-subTxt">
                            سود افام 2,000,000 تومان
                          </span>
                          <span className="request-item-info-price request-item-info-priceThree">
                            {
                              props.loneSlices.length > 0 ?
                                `${persianNumberCurrency(props.loanResult.refund.toString())} تومان`
                                :
                                `${persianNumberCurrency(loan.refund.toString())} تومان`
                            }
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col
                  md={{ size: 8 }}
                  className="request-item-info-details-container"
                >
                  <div className='request-item-info-details-main customScroll'>
                    <div className="request-item-info-details">
                      <span className="request-item-info-details-head">
                        بیمه پوشش حوادث
                      </span>
                      <p className="request-item-info-details-txt">
                        این بیمه فقط برای خرید اجناس است این بیمه فقط برای خرید
                        اجناس است این بیمه فقط برای خرید اجناس است این بیمه فقط
                        برای خرید اجناس است این بیمه فقط برای خرید اجناس است این
                        بیمه فقط برای خرید اجناس است این بیمه فقط برای خرید
                        اجناس است این بیمه فقط برای خرید اجناس است این بیمه فقط
                        برای خرید اجناس است این بیمه فقط برای خرید اجناس است این
                        بیمه فقط برای خرید اجناس است این بیمه فقط برای خرید
                        اجناس است این بیمه فقط برای خرید اجناس است این بیمه فقط
                        برای خرید اجناس است این بیمه فقط برای خرید اجناس است این
                        بیمه فقط برای خرید اجناس است .
                      </p>
                    </div>
                    <div className="request-item-info-details">
                      <span className="request-item-info-details-head">
                        بیمه پوشش حوادث
                      </span>
                      <p className="request-item-info-details-txt">
                        این بیمه فقط برای خرید اجناس است این بیمه فقط برای خرید
                        اجناس است این بیمه فقط برای خرید اجناس است این بیمه فقط
                        برای خرید اجناس است این بیمه فقط برای خرید اجناس است این
                        بیمه فقط برای خرید اجناس است این بیمه فقط برای خرید
                        اجناس است این بیمه فقط برای خرید اجناس است این بیمه فقط
                        برای خرید اجناس است این بیمه فقط برای خرید اجناس است این
                        بیمه فقط برای خرید اجناس است این بیمه فقط برای خرید
                        اجناس است این بیمه فقط برای خرید اجناس است این بیمه فقط
                        برای خرید اجناس است این بیمه فقط برای خرید اجناس است این
                        بیمه فقط برای خرید اجناس است .
                      </p>
                    </div>
                    <div className="request-item-info-details">
                      <span className="request-item-info-details-head">
                        بیمه پوشش حوادث
                      </span>
                      <p className="request-item-info-details-txt">
                        این بیمه فقط برای خرید اجناس است این بیمه فقط برای خرید
                        اجناس است این بیمه فقط برای خرید اجناس است این بیمه فقط
                        برای خرید اجناس است این بیمه فقط برای خرید اجناس است این
                        بیمه فقط برای خرید اجناس است این بیمه فقط برای خرید
                        اجناس است این بیمه فقط برای خرید اجناس است این بیمه فقط
                        برای خرید اجناس است این بیمه فقط برای خرید اجناس است این
                        بیمه فقط برای خرید اجناس است این بیمه فقط برای خرید
                        اجناس است این بیمه فقط برای خرید اجناس است این بیمه فقط
                        برای خرید اجناس است این بیمه فقط برای خرید اجناس است این
                        بیمه فقط برای خرید اجناس است .
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="send-request-footer">
              <button className="send-request-btn" onClick={handleUpdatedLoanAccept}>ذخیره و ثبت درخواست</button>
            </div>
          </Jumbotron>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => ({
  purchaseAllInfo: state.purchase.purchaseResult,
  loading: state.loan.loading,
  error: state.loan.error,
  loanResult: state.loan.loanUpdatedResult,
  loneSlices: state.loan.loanSlices,
  payment_invoice: state.loan.payment_invoice
});

const mapDispatchToProps = (dispatch) => ({
  updateLoan: (param) => {
    dispatch(updateLoanStart(param));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestStepTwo);
