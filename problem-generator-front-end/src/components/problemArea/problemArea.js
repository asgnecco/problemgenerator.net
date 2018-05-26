import React, {Component} from 'react';
import style from './problemArea.scss';
import ProgressBar from './progressBar/progressBar.js';
import * as actionTypes from "../../store/actions";
import {connect} from 'react-redux';
import axios from 'axios';
import * as URL from '../../urlConstants.js';
const difficulties = ['Easy', 'Medium', 'Hard', 'Insane'];


class problemArea extends Component {
    state = {
        answer: ''
    };

    updateAnswer = (event) => {
        this.setState({
            answer: event.target.value
        });
    };

    componentDidMount(){
        this.generateNewProblem();
    }

    generateNewProblem = () => {
        axios.get(URL.BASE + 'generate/' + this.props.selectedId + '/' + this.props.difficulty).then(response => {
            if(response.status === 200){
                this.props.onLoadProblem(response.data.problem);
            }
        });
    };

    checkProblem = () => {
        if(this.state.answer !== null || this.state.answer !== '') {
            axios.get(URL.BASE + 'check/' + encodeURIComponent(this.state.answer)).then(response => {
                if (response.status === 200) {
                    this.props.addResult(response.data.correct);
                }
            });
        }
    };

    render() {
        return (
            <div className={style.problemArea}>
                <h2>Problem {this.props.problem.id}</h2>
                <p>{this.props.problem.description}</p>
                <div className={style.svg} dangerouslySetInnerHTML={{__html: this.props.problem.svg}}></div>
                <input onChange={this.updateAnswer}></input>
                <div className={style.buttonGroup}>
                    <ProgressBar width={this.props.averageResult * 100}/>
                    <button onClick={this.checkProblem}>Submit</button>
                    <button onClick={this.generateNewProblem}>Skip</button>
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
        problem: state.problem,
        selectedId: state.selectedId,
        averageResult: state.averageResult
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeDifficulty: () => dispatch({type: actionTypes.CHANGE_DIFFICULTY}),
        onLoadProblem: (problem) => dispatch({type: actionTypes.LOAD_PROBLEM, newProblem: problem}),
        addResult: (result) => dispatch({type: actionTypes.ADD_PROBLEM_RESULT, newResult: result})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(problemArea);