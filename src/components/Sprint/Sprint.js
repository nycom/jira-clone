import React from 'react';

// import axios from 'axios';
import PropTypes from 'prop-types';
import StateCol from '../StateCol/StateCol';
import { connect } from 'react-redux';
import StateMachine from '../../FiniteStateMachine/FiniteStateMachine';

const createFSMTasks = (tasks, jiraConfig) => {
    return tasks.map(task => {
        const fsmTask = {
            task,
            sm: new StateMachine(jiraConfig)
        };
        fsmTask.sm.setInitialState(task.currentState);
        fsmTask.sm.start();
        return fsmTask;
    });
};

const mapStateToProps = ({ main, tasks }, ownProps) => {
    const { jiraConfig } = main;
    const updatedTasks = createFSMTasks(tasks, jiraConfig);
    return { ...main, updatedTasks };
};

class Sprint extends React.Component {
    filterTasks = (state, tasks) => {
        return tasks.filter(task => task.sm.currentState.name === state);
    };

    render() {
        const { updatedTasks, states } = this.props;
        const statesArray = Object.values(states);
        const filtered = {
            ...statesArray.map(state => {
                return {
                    [state]: updatedTasks.filter(
                        task => task.sm.currentState.name === state
                    )
                };
            })
        };
        statesArray.map(state => console.log(filtered[state]));
        console.log(filtered);
        console.log('Sprint rendered');
        return (
            <div className="sprint-container">
                {statesArray.map(state => {
                    return (
                        <StateCol
                            FSMtasks={this.filterTasks(state, updatedTasks)}
                            key={state}
                            title={state}
                        />
                    );
                })}
            </div>
        );
    }
}

Sprint.propTypes = {
    dispatch: PropTypes.func,
    handleClick: PropTypes.func,
    jiraConfig: PropTypes.array,
    updatedTasks: PropTypes.array,
    states: PropTypes.object,
    data: PropTypes.array
};
export default connect(mapStateToProps)(Sprint);
