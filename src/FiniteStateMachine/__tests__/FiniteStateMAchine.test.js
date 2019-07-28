import StateMachine from '../FiniteStateMachine';

const jiraConfig = [
    {
        name: 'Todo',
        transitions: [
            {
                action: 'Start',
                target: 'In Development'
            }
        ]
    },
    {
        name: 'In Development',
        transitions: [
            { action: 'Finish', target: 'QA' },
            { action: 'Cancel', target: 'Todo' }
        ]
    },
    {
        name: 'QA',
        transitions: [
            {
                action: 'Reject',
                target: 'InDevelopment'
            },
            { action: 'Accept', target: 'Done' }
        ]
    },
    {
        name: 'Done',
        transitions: [{ action: 'Redo', target: 'Todo' }]
    }
];

let fsm;

beforeEach(() => {
    fsm = new StateMachine(jiraConfig);
    fsm.setInitialState('Todo');
    fsm.start();
});

test('fsm creation check', () => {
    expect(fsm.currentState.name).toBe('Todo');
});

test('fsm state transition check', () => {
    fsm.action('Start');
    expect(fsm.currentState.name).toBe('In Development');
});

test('fsm state transition false positive check', () => {
    fsm.action('Reject');
    expect(fsm.currentState.name).toBe('Todo');
});
test('fsm validate states amount', () => {
    expect(fsm.getStatesAmount()).toBe(4);
});
