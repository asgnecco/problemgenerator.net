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

    var content = null;
    if(!props.loading){
        content = props.topicsList.map(topics => {
            return (<MenuItem
                    key={topics.id}
                    title={topics.topicName}
                    subtopics={topics.subtopics}
                    click={props.click}
                    selectedId={props.selectedId}
                />
            );
        });
    }else{
        content = <p className={styles.loadText}>Loading...</p>
    }

    return(
        <nav className={style}>
            {content}
        </nav>
    );
};

export default nav;