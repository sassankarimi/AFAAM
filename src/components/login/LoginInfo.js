import React from 'react';
import { Row, Col } from 'reactstrap';

const LoginInfo = (props) => {

    return (
        <>
            <Row>
                <Col md={{ size: 12 }} className='txt-right'>
                </Col>
                <Col md={{ size: 12 }} className='txt-right padd-30 '>
           
    <div class="stars">
    <div class="custom-navbar">
        <div class="navbar-links">
            <ul>
            </ul>
        </div>
    </div>
    <div class="central-body">
        <img class="image-404" src="/bgs/text.png" alt='افام' width="300px" />
    </div>
    <div class="objects">
        <img class="object_rocket" src="/bgs/rocket.svg" alt='افام' width="170px" />
        <div class="earth-moon">
            <img class="object_earth" src="/bgs/earth.svg" alt='افام' width="100px" />
            <img class="object_moon" src="/bgs/moon.svg" alt='افام' width="80px" />
        </div>
        <div class="box_astronaut">
            <img class="object_astronaut" src="/bgs/astronaut.svg" alt='افام' width="140px" />
        </div>
    </div>
    <div class="glowing_stars">
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
    </div>
</div>
                


                </Col>
                <Col md={{ size: 12 }} className='txt-right padd-30 marg-top-60px login-footer' style={{ paddingBottom: 10 }}>
                    <div className='login-info-footer-container'>
                        <span className='login-info-footer-txt login-info-footer-txt-service'>حریم شخصی</span>
                        <span className='login-info-footer-txt login-info-footer-txt-service'>شرایط استفاده از خدمات</span>
                        <span className='login-info-footer-txt login-info-footer-txt-service'>تماس با ما</span>
                        <br />
                        <span className='login-info-footer-txt'>تمامی حقوق محفوظ است &#169; 1398</span>
                    </div>
                </Col>
            </Row>
        </>
    )
}


export default LoginInfo;