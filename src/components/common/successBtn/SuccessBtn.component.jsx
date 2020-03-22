import React from 'react';
import './SuccessBtn.styles.scss';
import { MdDone } from "react-icons/md";

const SuccessBtn = (props) => (
    <button className="success-btn" style={{ background: props.bg ? props.bg : null }}>
        <MdDone />
    </button>
);

export default SuccessBtn;