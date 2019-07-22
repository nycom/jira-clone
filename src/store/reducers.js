import { combineReducers } from 'redux';
import { UPDATE_TASK } from './constants';

const states = {
    Todo: 'Todo',
    InDevelopment: 'InDevelopment',
    QA: 'QA',
    Done: 'Done'
};
const actions = {
    Start: 'Start',
    Cancel: 'Cancel',
    Finish: 'Finish',
    Reject: 'Reject',
    Accept: 'Accept',
    Redo: 'Redo'
};
const tasksInitialState = [
    {
        key: 't1',
        name: 'Task 1',
        currentState: 'Todo'
    },
    {
        key: 't2',
        name: 'Task 2',
        currentState: 'InDevelopment'
    },
    {
        key: 't3',
        name: 'Task 3',
        currentState: 'Todo'
    }
];

const initialConfig = {
    states: {
        Todo: 'Todo',
        InDevelopment: 'InDevelopment',
        QA: 'QA',
        Done: 'Done'
    },
    actions: {
        Start: 'Start',
        Cancel: 'Cancel',
        Finish: 'Finish',
        Reject: 'Reject',
        Accept: 'Accept',
        Redo: 'Redo'
    },
    jiraConfig: [
        {
            name: states.Todo,
            transitions: [
                {
                    action: actions.Start,
                    target: states.InDevelopment
                }
            ]
        },
        {
            name: states.InDevelopment,
            transitions: [
                { action: actions.Finish, target: states.QA },
                { action: actions.Cancel, target: states.Todo }
            ]
        },
        {
            name: states.QA,
            transitions: [
                {
                    action: actions.Reject,
                    target: states.InDevelopment
                },
                { action: actions.Accept, target: states.Done }
            ]
        },
        {
            name: states.Done,
            transitions: [{ action: actions.Redo, target: states.Todo }]
        }
    ]
};

function main(state = initialConfig, action) {
    switch (action.type) {
        case 'CONFIG_LOADED':
            return action.payload;
        default:
            return state;
    }
}
function tasks(state = tasksInitialState, action) {
    switch (action.type) {
        case UPDATE_TASK:
            return state.map(task => {
                if (task.key === action.payload.key) {
                    return { ...action.payload };
                }
                return task;
            });
        default:
            return state;
    }
}
export default combineReducers({
    main,
    tasks
});
