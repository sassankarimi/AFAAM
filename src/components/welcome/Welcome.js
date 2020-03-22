import React from "react";
import { Row, Col } from "reactstrap";
import NewRequestBtn from "../common/newRequestbtn";
import NavBar from "../nav/NavBar";
import { Sticky } from 'react-sticky';

const Welcome = props => {
  return (
    <>
      <Sticky>
        {
          ({ style }) => (
            <header style={{ ...style, zIndex: 1000 }}>
              <NavBar />
            </header>
          )
        }
      </Sticky>
      <div className="new-request-box-container">
        <Row>
          <Col md={{ size: 12 }}>
            <h1 className="new-request-box-header">وام های درخواستی</h1>
          </Col>
          <Col md={{ size: 12 }}>
            <div className="new-request-box-inside">
              <div className="new-request-box-inside-container">
                <span className="new-request-box-inside-bold">خوش آمدید.</span>
                هنوز درخواستی ثبت نکرده اید!؟
                <br />
                با ثبت درخواست جدید شروع کنید. تنها کافیست مبلغ مورد نیازتان -
                تعداد و مبالغ اقساط را مشخص کنید به همین راحتی!
              </div>
            </div>
          </Col>
          <Col md={{ size: 12 }}>
            <div className="new-request-box-inside-btn-container">
              <NewRequestBtn />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Welcome;
