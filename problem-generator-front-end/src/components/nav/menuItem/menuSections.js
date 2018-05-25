import React from 'react';
import style from './menuSections.scss';

const menuSection = (props) => {
    return(
        <div className={style.subSection}>
            <h4>{props.title}:</h4>
            {props.subtopics.map(topic => {
                return <p>{topic}</p>;
            })}
        </div>
    );
};


export default menuSection;