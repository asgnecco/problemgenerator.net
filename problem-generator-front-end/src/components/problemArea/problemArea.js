import React, {Component} from 'react';
import style from './problemArea.scss';
import ProgressBar from './progressBar/progressBar.js';
import * as actionTypes from "../../store/actions";
import {connect} from 'react-redux';
const difficulties = ['Easy', 'Medium', 'Hard', 'Insane'];

class problemArea extends Component {
    render() {
        return (
            <div className={style.problemArea}>
                <h2>Problem {this.props.problem.id}</h2>
                <p>{this.props.problem.description}</p>
                <div className={style.svg} dangerouslySetInnerHTML={{__html: this.props.problem.svg}}></div>
                <input></input>
                <div className={style.buttonGroup}>
                    <ProgressBar width={10}/>
                    <button>Submit</button>
                    <button>Skip</button>
                    <button onClick={this.props.onChangeDifficulty}>{difficulties[this.props.difficulty]}</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        difficulty: state.difficulty,
        selectedTopic: state.selectedTopic,
        problem: state.problem
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeDifficulty: () => dispatch({type: actionTypes.CHANGE_DIFFICULTY})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(problemArea);