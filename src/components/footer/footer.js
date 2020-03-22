import React from "react";
import { Row, Col } from "reactstrap";
import { FaQuestionCircle } from 'react-icons/fa';

const Footer = props => {
  return (
    <div className='footer' >
      <Row>
        <Col md={{ size: 6 }}>
          <span className="footer-copyRight">حقوق برای افام محفوظ است</span>
        </Col>
        <Col md={{ size: 6 }}>
            <div className='footer-menu'>
                <span className='footer-menu-item'>پشتیبانی</span>
                <span className='footer-menu-item'>حریم شخصی</span>
                <span className='footer-menu-item'>شرایط استفاده از خدمات</span>
                <span className='footer-menu-item'>تماس با ما</span>
                <span className='footer-menu-item footer-menu-item-faq-icon'><FaQuestionCircle/></span>
            </div>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
