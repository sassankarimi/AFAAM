import React, { useState } from "react";
import LoginBox from './LoginBox';
import ReactTooltip from "react-tooltip";
import { Row, Col } from "reactstrap";

const LoginModal = props => {
  const [validPhone, setValidPhone] = useState(false);
  const setValidPhoneFromChild = (param) => {
    setValidPhone(param);
  }
  return (
    <>
      <ReactTooltip id="phone" />
      <ReactTooltip id="myPhone" />
      <div className="login-modal-container">
        <Row className="mobile-only">
          <Col
            md={{ size: 12 }}
            className="txt-right padd-30 mobile-only-txt-center"
          >
            <div className="login-modal-info-txt-container">
              <p className="login-modal-info-txt">
                ورود به سامانه مدیریت اقساط و سرمایه گذاری ها
              </p>
              <span className="login-modal-info-txt-user">
                برای استفاده از تمام امکانات وارد شوید
              </span>
            </div>
          </Col>
        </Row>
        <LoginBox authFunction={setValidPhoneFromChild} auth={validPhone} />
        <Col
          md={{ size: 12 }}
          className="txt-right padd-30 marg-top-60px login-footer mobile-only"
        >
          <div className="login-modal-info-footer-container">
            <span className="login-modal-info-footer-txt login-modal-info-footer-txt-service">
              حریم شخصی
            </span>
            <span className="login-modal-info-footer-txt login-modal-info-footer-txt-service">
              شرایط استفاده از خدمات
            </span>
            <span className="login-modal-info-footer-txt login-modal-info-footer-txt-service">
              تماس با ما
            </span>
            <br />
            <span className="login-modal-info-footer-txt">
              تمامی حقوق محفوظ است &#169; 1398
            </span>
          </div>
        </Col>
      </div>
    </>
  );
};

export default LoginModal;
