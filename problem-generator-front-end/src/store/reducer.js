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
    results: 0.0
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
            var results = state.results + action.newResult;

            if(results > 100) {results = 100;}
            else if(results < 0) {results = 0;}

            return {
                ...state,
                results: results
            };
        default:
            return state;
    }
};

export default reducer;