import axios from 'axios';
import { config, tasks } from '../../mocker/mockData';
import {
    REQUEST_INITIAL_DATA,
    LOAD_INITIAL_DATA,
    UPDATE_TASK,
    LOAD_TASKS,
    SELECT_TASK,
    CLEAR_TASK
} from './constants';

export const updateTask = payload => {
    return { type: UPDATE_TASK, payload };
};

export const selectTask = payload => {
    return { type: SELECT_TASK, payload };
};

export const clearTask = payload => {
    return { type: CLEAR_TASK, payload };
};

export const loadTasks = payload => {
    return {
        type: LOAD_TASKS,
        payload
    };
};

export const loadConfig = payload => {
    return {
        type: LOAD_INITIAL_DATA,
        payload
    };
};

export const requestInitialData = () => ({
    type: REQUEST_INITIAL_DATA
});

export const fetchInitialData = () => {
    return dispatch => {
        dispatch(requestInitialData());
        return (process.env.NODE_ENV === 'dev'
            ? axios.get(`/api/initialData`)
            : Promise.resolve({ data: { config, tasks } })
        )
            .then(res => {
                const { config, tasks } = res.data;
                dispatch(loadConfig(config));
                dispatch(loadTasks(tasks));
            })
            .catch(error => console.log('An Error Occurred', error));
    };
};
