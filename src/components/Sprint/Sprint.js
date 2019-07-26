import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import StateMachine from '../../FiniteStateMachine/FiniteStateMachine';
import StateCol from '../StateCol/StateCol';
import { fetchInitialData } from '../../store/actions';

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

const mapStateToProps = ({ config, tasks }, ownProps) => {
    const { jiraConfig, loading } = config;
    const updatedTasks = createFSMTasks(tasks, jiraConfig);
    return { ...config, loading, updatedTasks };
};

class Sprint extends React.Component {
    filterTasks = (state, tasks) => {
        return tasks.filter(task => task.sm.currentState.name === state);
    };

    componentDidMount() {
        this.props.dispatch(fetchInitialData());
    }

    render() {
        const { updatedTasks, states = [], loading = false } = this.props;
        const statesArray = Object.values(states);
        return loading ? (
            <h1>Loading Jira Configuration</h1>
        ) : (
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
    loading: PropTypes.bool,
    handleClick: PropTypes.func,
    jiraConfig: PropTypes.array,
    updatedTasks: PropTypes.array,
    states: PropTypes.object,
    data: PropTypes.array
};
export default connect(mapStateToProps)(Sprint);
