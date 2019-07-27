import { combineReducers } from 'redux';
import {
    REQUEST_INITIAL_DATA,
    LOAD_INITIAL_DATA,
    LOAD_TASKS,
    UPDATE_TASK,
    SELECT_TASK,
    CLEAR_TASK
} from './constants';

const initialConfig = { loading: false };

function config(state = initialConfig, action) {
    switch (action.type) {
        case REQUEST_INITIAL_DATA:
            return { ...state, loading: true };
        case LOAD_INITIAL_DATA:
            return { ...state, ...action.payload, loading: false };
        default:
            return state;
    }
}
function tasks(state = [], action) {
    switch (action.type) {
        case LOAD_TASKS:
            return [...action.payload];
        case UPDATE_TASK:
            return state.map(task => {
                if (task.id === action.payload.id) {
                    return { ...action.payload };
                }
                return task;
            });
        default:
            return state;
    }
}

function selectedTask(state = {}, action) {
    switch (action.type) {
        case SELECT_TASK:
            return { ...action.payload };
        case CLEAR_TASK:
            return {};
        default:
            return state;
    }
}
export default combineReducers({
    config,
    tasks,
    selectedTask
});
