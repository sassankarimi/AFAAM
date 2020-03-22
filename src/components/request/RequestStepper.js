import React from "react";
import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faCommentsDollar,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import { toast_error, checkObjLength } from '../common/funcComponents/FuncComponent';
import { change_Step } from '../../redux/stepper/actions/stepper.action';
import { connect } from 'react-redux';
const RequestStepper = props => {
  const { whichState } = props;

  const handleStepperChangeStep = (step) => {
    switch (step) {
      case 1:
        props.changeStep(1);
        break;
      case 2:
        if (props.purchaseResult.length > 0 || checkObjLength(props.purchaseResult) > 0) {
          props.changeStep(2);
        } else {
          toast_error('ابتدا درخواست محصول خود را ثبت کنید');
        }
        break;
      case 3:
        if (props.loanUpdatedResult.length > 0 || checkObjLength(props.loanUpdatedResult) > 0) {
          if (props.loanUpdatedResult.prepayment_invoice !== 'null' &&
            props.loanUpdatedResult.prepayment_invoice !== null &&
            props.loanUpdatedResult.prepayment_invoice
          ) {
            props.changeStep(3);
          } else {
            toast_error('ابتدا مراحل قبل را کامل کنید');
          }
        } else {
          toast_error('ابتدا مراحل قبل را کامل کنید');
        }
        break;

      default:
        break;
    }
  };

  return (
    <div className='request-stepper'>
      <Row>
        <Col md={{ size: 12 }}>
          <div className="stepper">
            <div className="stepper-container">
              <div className="stepper-progress">
                <div
                  id="stepper-bar"
                  className="stepper-progress-bar"
                  style={{ width: whichState === 2 ? '50%' : whichState === 3 ? '100%' : '0%' }}
                ></div>
              </div>
              <div className="stepper-box stepper-box-one" onClick={() => handleStepperChangeStep(1)}>
                <div
                  id="stepper-box-one"
                  className="stepper-box-icon stepper-box-icon-done"
                >
                  <FontAwesomeIcon icon={faBox} />
                </div>
                <h3 className="stepper-box-header">1.درخواست محصول</h3>
                <span className="stepper-box-txt">
                  ثبت درخواست کالا یا خدمات برای گرفتن تایید پرداخت
                </span>
              </div>
              <div className="stepper-box stepper-box-two" onClick={() => handleStepperChangeStep(2)}>
                <div id="stepper-box-two" className={`stepper-box-icon ${(whichState === 2 || whichState === 3) ? 'stepper-box-icon-done' : ''}`}>
                  <FontAwesomeIcon icon={faCommentsDollar} />
                </div>
                <h3 className="stepper-box-header">2.بررسی و پرداخت</h3>
                <span className="stepper-box-txt">
                  بررسی وضعییت سفارش و پرداخت مبلغ پیش پرداخت
                </span>
              </div>
              <div className="stepper-box stepper-box-three" onClick={() => handleStepperChangeStep(3)}>
                <div id="stepper-box-three" className={`stepper-box-icon ${(whichState === 3) ? 'stepper-box-icon-done' : ''}`}>
                  <FontAwesomeIcon icon={faCheck} />
                </div>
                <h3 className="stepper-box-header">3.تاییدیه</h3>
                <span className="stepper-box-txt">
                  دریافت تاییدیه پرداخت وجه کالا و لذت یک خرید آسان
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  purchaseResult: state.purchase.purchaseResult,
  loanUpdatedResult: state.loan.loanUpdatedResult
});

const mapDisPatchToProps = (dispatch) => ({
  changeStep: (step) => {
    dispatch(change_Step(step));
  }
});

export default connect(mapStateToProps, mapDisPatchToProps)(RequestStepper);
