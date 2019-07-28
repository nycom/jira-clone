exports.tasks = [
    {
        id: 'Task 1',
        name: 'Create Finite State Machine',
        description:
            'Create an Finite State Machine library for development usage.',
        currentState: 'QA'
    },
    {
        id: 'Task 2',
        name: 'Create FSM Jira Clone',
        description:
            'Create Jira clone which will use our newly created Finite State Machine library.',
        currentState: 'In Development'
    },
    {
        id: 'Task 3',
        name: 'Unit Test Finite State Machine Library',
        description: 'Create Unit Tests for our Finite State Machine library.',
        currentState: 'Todo'
    },
    {
        id: 'Task 4',
        name: 'Deploy Application',
        description: 'Deploy our application to github pages.',
        currentState: 'Todo'
    }
];

exports.config = {
    states: {
        Todo: 'Todo',
        InDevelopment: 'In Development',
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
                    target: 'In Development'
                },
                { action: 'Accept', target: 'Done' }
            ]
        },
        {
            name: 'Done',
            transitions: [{ action: 'Redo', target: 'Todo' }]
        }
    ]
};
