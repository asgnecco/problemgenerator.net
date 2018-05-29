import * as actionTypes from './actions.js';
import {CHANGE_DIFFICULTY, CHANGE_MENU} from "./actions";

const initState = {
    menu: null,
    difficulty: 0, // Represents easy
    selectedTopic: 'Derivatives',
    selectedId: 1,
    windowSize: {width: 0, height: 0},
    topicsList: [
        {
            topicName: 'Loading...',
            id: 1,
        }
    ],
    problem: {
        id: 1,
        description: 'Loading...',
        svg: ''
    },
    results: [0, 0, 0, 0, 0],
    averageResult: 0.0
};

const SUPPORTED_DIFFICULTIES = 4;

function getNameWithId(topicsList, id){
    var i, j;
    for(i = 0; i < topicsList.length; i++){
        for(j = 0; j < topicsList[i].subtopics.length; j++){
            if(topicsList[i].subtopics[j].id === id){
                return topicsList[i].subtopics[j].name;
            }
        }
    }

    return 'Error';
}

const reducer = (state = initState, action) => {
    switch(action.type){
        case actionTypes.CHANGE_MENU:
            if(state.menu !== 'slide-in'){
                return {...state, menu: 'slide-in'};
            }else{
                return {...state, menu: 'slide-out'};
            }
        case actionTypes.CHANGE_DIFFICULTY:
            return {...state, difficulty: (state.difficulty + 1) % SUPPORTED_DIFFICULTIES};
        case actionTypes.SELECT_TOPIC:
            return {...state,
                selectedTopic: getNameWithId(state.topicsList, action.newSelection),
                selectedId: action.newSelection,
            };
        case actionTypes.UPDATE_WINDOW_SIZE:
            return {
                ...state,
                windowSize: action.windowSize
            };
        case actionTypes.LOAD_TOPIC_LIST:
            return {
                ...state,
                topicsList: action.newTopicList
            };
        case actionTypes.LOAD_PROBLEM:
            return {
                ...state,
                problem: action.newProblem
            };
        case actionTypes.ADD_PROBLEM_RESULT:
            var results = state.results;
            results.splice(0, 1);
            results.push(action.newResult);

            var sum = 0.0;
            for(var i = 0; i < results.length; i++){
                sum += results[i];
            }

            console.log(results);

            return {
                ...state,
                results: results,
                averageResult: sum / results.length
            };
        default:
            return state;
    }
};

export default reducer;