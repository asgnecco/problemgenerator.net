import React from 'react';
import styles from './navMenu.scss';
import animations from './animation.scss';
import './animation.scss';
import MenuItem from './menuItem/menuSections.js';

const nav = function(props){
    var style = styles;

    if(props.show === 'slide-in'){
        style = animations.fadeIn;
    }else if(props.show === 'slide-out'){
        style = animations.fadeOut;
    }

    return(
        <nav className={style}>
            {props.topicsList.map(topics => {
                return (<MenuItem key={topics.id} title={topics.topicName} subtopics={topics.subtopics} click={props.click}/>);
            })}
        </nav>
    );
};

export default nav;