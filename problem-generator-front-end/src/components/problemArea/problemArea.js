import React from 'react';
import style from './problemArea.scss';

const problemArea = (props) => {
    return (
        <div className={style.problemArea}>
            <h2>Problem {props.number}</h2>
            <p>{props.problemDescription}</p>
            <div className={style.svg} dangerouslySetInnerHTML={{__html: props.problem}}></div>
            <input></input>
            <div className={style.buttonGroup}>
                <div className={style.progressHolder}>
                    <div>
                    </div>
                </div>
                <button>Submit</button>
                <button>Skip</button>
                <button onClick={props.difficultyChanger}>{props.difficulty}</button>
            </div>
        </div>
    );
};

export default problemArea;