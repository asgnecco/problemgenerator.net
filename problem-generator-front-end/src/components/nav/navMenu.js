import React from 'react';
import classes from './navMenu.scss';

const nav = function(props){
    var style = {
        'width': '0%',
        'margin-right': '0%'
    };

    if(props.show){
        style.width = '20%';
        style["margin-right"] = '20%';
    }

    return(
        <nav className={classes} style={style}>
            <h4>Calculus</h4>
            <span>Test</span>
            <span>Test 1</span>
        </nav>
    );
};

export default nav;