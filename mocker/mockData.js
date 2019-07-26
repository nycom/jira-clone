exports.tasks = [
    {
        id: 't1',
        name: 'Task 1',
        currentState: 'Todo'
    },
    {
        id: 't2',
        name: 'Task 2',
        currentState: 'InDevelopment'
    },
    {
        id: 't3',
        name: 'Task 3',
        currentState: 'Todo'
    }
];

exports.config = {
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
            name: 'Todo',
            transitions: [
                {
                    action: 'Start',
                    target: 'InDevelopment'
                }
            ]
        },
        {
            name: 'InDevelopment',
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
    ]
};
