import React from "react";
import RequestStepOne from "../request/RequestStepOne";
import RequestStepTwo from "../request/RequestStepTwo";
import RequestStepThree from "../request/RequestStepThree";

const RequestStepHandler = props => {
  const { whichState } = props;
  switch (whichState) {
    case 1:
      return <RequestStepOne />;
    case 2:
      return <RequestStepTwo />;
    case 3:
      return <RequestStepThree />;
    default:
      return null;
  }
};

export default RequestStepHandler;
