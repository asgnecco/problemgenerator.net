import React from 'react';
import classes from './heading.scss';

const heading = (props) => {
    return (
        <div className={classes.header}>
            <img onClick={props.click} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABiSURBVGhD7dYxDYQAEADBq+neACJAyztABCKoEYEWtGABLtR0hIJjJlkPGwBw069ATRZ7geYstgJNGQAAD+oL1GaXW/y2zo1fCzRmAAA86F+gLrvc4rd1bvxSoCEDgK+LOACajShumfpRAQAAAABJRU5ErkJggg=="/>
            <h1>{props.title}</h1>
            <h3>{props.pageTitle}</h3>
        </div>
    );
};

export default heading;