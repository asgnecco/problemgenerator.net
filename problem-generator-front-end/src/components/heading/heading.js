import React from 'react';

const heading = (props) => {
    return (
        <div className="header">
            <h1>{props.title}</h1>
            <h3>{props.pageTitle}</h3>
        </div>
    );
};

export default heading;