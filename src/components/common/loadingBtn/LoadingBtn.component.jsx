import React from 'react';
import './LoadingBtn.styles.scss';
import LoadingBtnGif from '../../../assets/gifs/LoadingBtn.gif';

const LoadingBtn = (props) => (
    <button className="loading-btn" style={{ background: props.bg ? props.bg : null }}>
        <LoadingBtnGif />
    </button>
);

export default LoadingBtn;