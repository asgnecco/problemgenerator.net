import React from 'react';
import style from './progressBar.scss';

const progressBar = (props) => {
    var barWidth = {
        width: props.width + '%'
    };
    return (
        <div className={style.progressHolder}>
            <div style={barWidth}>
            </div>
        </div>
    );
};

export default progressBar;