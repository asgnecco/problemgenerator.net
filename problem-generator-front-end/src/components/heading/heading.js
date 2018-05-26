import React from 'react';
import classes from './heading.scss';

const heading = (props) => {
    return (
        <div className={classes.header}>
            <span onClick={props.click}>&nbsp;</span>
            <h1>{props.title}</h1>
            <h3>{props.pageTitle}</h3>
        </div>
    );
};

export default heading;