import React, { useEffect, useState } from 'react';
import NumberFormat from "react-number-format";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faKey } from "@fortawesome/free-solid-svg-icons";
import { userAuth, userVerification } from '../../redux/user/actions/user.actions';
import { withRouter } from 'react-router-dom';
import Loading from '../common/loading/Loading.component';

const LoginBox = props => {
    const [phone, setPhone] = useState("");
    const [userVerifyCode, setUserVerifyCode] = useState("");
    const [clientErr, setClientErr] = useState('');

    useEffect(() => {
        const { userData, userInfo, history } = props;
        setPhone(phone);
        if (userData !== undefined) {
            if (userData.length !== 0) {
                console.log(`کد شما : ${userData.code}`);
                props.authFunction(true);
                // console.log(props.userData);
            }
        }
        if (userInfo !== undefined) {
            if (userInfo.length !== 0) {
                localStorage.setItem('Token', userInfo.authorization);
                history.push('/account');
            }
        }
    }, [phone, props]);

    const handleExceptions = type => {
        switch (type) {
            case 1: // number is true
                document.getElementById("phoneMask").style.border = "1px solid #ced4da";
                document.getElementById("input-error-msg").style.display = "none";
                break;
            case 2: // number is false
                document.getElementById("phoneMask").style.border = "1px solid red";
                document.getElementById("input-error-msg").style.display = "initial";
                break;
            case 3: // code is true
                document.getElementById("verifyCode").style.border =
                    "1px solid #ced4da";
                document.getElementById("input-error-msg-verify").style.display =
                    "none";
                break;
            case 4: // code is false
                document.getElementById("verifyCode").style.border = "1px solid red";
                document.getElementById("input-error-msg-verify").style.display =
                    "initial";
                break;
            default:
        }
    };

    /////////////////Mobile Handlers/////////////////////
    // user mobile handler
    const handlePhone = e => {
        let val = e.target.value.replace(/\D/g, '');
        let numberRegex = /^\d+$/g;
        handleExceptions(1);
        setClientErr('');
        if (val !== "") {
            if (numberRegex.test(val)) {
                setPhone(val);
            } else {
                setClientErr('فرمت شماره موبایل قابل قبول نیست');
                handleExceptions(2);
            }
        } else {
            setPhone('');
        }
    };
    // Auth    
    const handleSubmit = () => {
        if (phone === '') {
            setClientErr('شماره موبایل را وارد کنید!');
            handleExceptions(2);
            return;
        }
        if (phone.length !== 11) {
            setClientErr('شماره موبایل وارد شده صحیح نمیباشد!');
            handleExceptions(2);
            return;
        } else {
            props.authRequest({ phone: phone });
        }
    };
    // enter key for mobile
    const handleKey = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }
    //send again code
    const handleSendAgain = () =>{
        window.location.reload();
    }
    ///////////////////////////////////////////////////

    /////////////////Code Handlers/////////////////////
    // user verify code handler
    const handleCode = (e) => {
        let val = e.target.value.replace(/\D/g, '');
        let numberRegex = /^\d+$/g;
        handleExceptions(3);
        setClientErr('');
        if (val !== "") {
            if (numberRegex.test(val)) {
                setUserVerifyCode(val);
            } else {
                setClientErr('فرمت کد قابل قبول نیست');
                handleExceptions(4);
            }
        } else {
            setUserVerifyCode('');
        }
    };
    // Verify    
    const handleLogin = () => {
        if (userVerifyCode === '') {
            setClientErr('کد را وارد کنید!');
            handleExceptions(4);
            return;
        }
        props.verifyRequest({ code: userVerifyCode, phone });
    };
    const handleCodeKey = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    }
    ///////////////////////////////////////////////////

    // if (props.error) {
    //     return (
    //         <>
    //             <span style={{ color: 'red' }}>request response error :</span>
    //             <div style={{ color: 'red' }}>
    //                 {props.error.message}
    //             </div>
    //         </>
    //     )
    // }

    return (
        <>
         <Loading active={props.loading} />
         <div class='logo-parent'>
            <i className="afaam-icon txt-right mobile-only-icon"></i>
            </div>
            <div className="login-modal">
                {/* title */}
                {
                    props.auth ?
                        (
                            <h2 className="login-modal-title">
                                برای ورود کد ارسال شده را وارد کنید
                            </h2>
                        ) :
                        (
                            <h2 className="login-modal-title">
                                برای ورود شماره موبایل خود را وارد کنید
                        </h2>
                        )
                }
                {/* phone input */}
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <FontAwesomeIcon icon={faPhoneAlt} />
                        </div>
                    </div>
                    {
                        props.auth ?
                            (
                                <input
                                    type="text"
                                    className="form-control login-modal-input"
                                    id="myPhone"
                                    defaultValue={props.userPhone}
                                    data-for="phone"
                                    data-tip="شماره موبایل شما"
                                    readOnly
                                />
                            )
                            :
                            (
                                <>
                                    <NumberFormat
                                        className="form-control login-modal-input"
                                        type="text"
                                        autoFocus
                                        placeholder="0912 - 000 - 0000"
                                        id="phoneMask"
                                        data-for="phone"
                                        data-tip="شماره موبایل"
                                        value={phone}
                                        onChange={handlePhone}
                                        onKeyDown={handleKey}
                                        displayType={"input"}
                                        format="#### - ### - ####"
                                    />
                                    <span id="input-error-msg" className="input-error-msg">
                                        {clientErr}
                                    </span>
                                </>
                            )
                    }
                </div>
                {/* verify code input */}
                {
                    props.auth ?
                        (
                            <div className="input-group mb-2 input-contain-msg">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <FontAwesomeIcon icon={faKey} />
                                    </div>
                                </div>
                                <NumberFormat
                                    className="form-control login-modal-input"
                                    type="text"
                                    placeholder="XX-XX-XX"
                                    id="verifyCode"
                                    displayType={"input"}
                                    onChange={handleCode}
                                    onKeyDown={handleCodeKey}
                                    format="##-##-##"
                                    data-for="phone"
                                    data-tip="کد تایید"
                                    autoFocus
                                />
                                <span id="input-error-msg-verify" className="input-error-msg">
                                    {clientErr}
                                </span>
                            </div>
                        )
                        :
                        null
                }
                {/* submit button */}
                {
                    props.auth ?
                        (
                            <div className="login-modal-submit" onClick={() => handleLogin()}>
                                ورود
                            </div>
                        )
                        :
                        (
                            <div className="login-modal-submit" onClick={() => handleSubmit()}>
                                ارسال کد
                            </div>
                        )
                }
                {/* resend code */}
                {
                    props.auth ?
                        <span className="login-modal-issue" onClick={handleSendAgain}>ارسال مجدد کد ورود</span>
                        :
                        <span className="login-modal-issue">در دریافت کد مشکل دارید؟</span>
                }
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    userData: state.user.result,
    userPhone: state.user.phone,
    error: state.user.error,
    loading: state.user.loading,
    phone: state.user.phone,
    userInfo: state.user.userInfo
});

const mapDispatchToProps = (dispatch) => ({
    authRequest: (data) => {
        dispatch(userAuth(data));
    },
    verifyRequest: (data) => {
        dispatch(userVerification(data));
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginBox));