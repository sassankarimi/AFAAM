import React from "react";
import NavBar from "../nav/NavBar";
import RequestStepper from "../request/RequestStepper";
import Footer from "../footer/footer";
import RequestStepHandler from "./RequestStepHandler";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Sticky } from 'react-sticky';

const Request = props => {
  let stepper_State = props.whichStep;
  const acc_tos = localStorage.getItem('_ac');
  if (acc_tos === '1') {
    return (
      <>
        <div className="request">
          <Sticky>
            {
              ({ style }) => (
                <header style={{ ...style, zIndex: 1000 }}>
                  <NavBar />
                </header>
              )
            }
          </Sticky>
          <RequestStepper whichState={stepper_State} />
          <div className='request-form'>
            <RequestStepHandler whichState={stepper_State} />
          </div>
          <Footer />
        </div>
      </>
    );
  } else {
    return <Redirect to='/account' />
  }
};


const mapStateToProps = (state) => ({
  whichStep: state.stepper.whichStep
});

export default connect(mapStateToProps)(Request);
