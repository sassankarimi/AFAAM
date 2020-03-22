import React from 'react';
import { Row , Col } from 'reactstrap';
import LoginModal  from './LoginModal';
import LoginInfo from './LoginInfo';

const Login = (props) => {

    return (
        <>
            <Row className='h--100'>
                <Col md={{ size: 8 }} className='login-info-col-container mobile-not-only'>
                    <LoginInfo {...props} />
                </Col>
                <Col md={{ size: 4 }} className='login-modal-col-container'>
                    <LoginModal {...props} />
                </Col>
            </Row>
        </>
    )
}


export default Login;