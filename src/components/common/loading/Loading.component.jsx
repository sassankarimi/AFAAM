import React from 'react';
import './Loading.styles.scss';

const Loading = (props) => {
    if (props.active) {
        return (
            <>
                <div className='loading-overlay'>
                    <div className='loading-container'>
                        <div className='loading'>
                            <h3 className='loading-header'>شکیبا باشید ...</h3>
                            <span className='loading-gif'></span>
                        </div>
                    </div>
                </div>
            </>
        )
    }else{
        return null;
    }
};

export default Loading;
