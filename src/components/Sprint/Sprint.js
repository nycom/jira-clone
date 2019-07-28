import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { invert } from 'lodash';
import { Dimmer, Loader } from 'semantic-ui-react';
import './sprint.scss';
import StateMachine from '../../FiniteStateMachine/FiniteStateMachine';
import StateCol from '../StateCol/StateCol';
import { clearTask, fetchInitialData, updateTask } from '../../store/actions';

const createFSMTasks = (tasks, jiraConfig) => {
    return tasks.map(task => {
        const fsmTask = {
            baseTask: task,
            sm: new StateMachine(jiraConfig)
        };
        fsmTask.sm.setInitialState(task.currentState);
        fsmTask.sm.start();
        return fsmTask;
    });
};

const mapStateToProps = ({ config, tasks, selectedTask }, ownProps) => {
    const { jiraConfig, loading } = config;
    const updatedTasks = createFSMTasks(tasks, jiraConfig);
    return { ...config, loading, updatedTasks, selectedTask };
};

class Sprint extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchInitialData());
    }

    filterTasks = (state, tasks) => {
        return tasks.filter(task => task.sm.currentState.name === state);
    };
    handleTaskStateChange = selectedState => {
        const selectedFSMTask = this.props.updatedTasks.filter(
            task => task.baseTask.id === this.props.selectedTask.task.id
        )[0];
        const requiredAction = invert(
            selectedFSMTask.sm.currentState.transitions
        )[selectedState];
        selectedFSMTask.sm.action(requiredAction);
        this.props.dispatch(
            updateTask({
                ...selectedFSMTask.baseTask,
                currentState: selectedFSMTask.sm.currentState.name
            })
        );
        this.props.dispatch(clearTask());
    };
    render() {
        const {
            updatedTasks,
            selectedTask = {},
            states = [],
            loading = false
        } = this.props;
        const statesArray = Object.values(states);
        const activeTargets = selectedTask.transitions
            ? Object.values(selectedTask?.transitions)
            : null;

        return loading ? (
            <Dimmer active>
                <Loader content="Loading Jira Config" size="huge" />
            </Dimmer>
        ) : (
            <Fragment>
                <div className="app-header">
                    Finite State Machine - Jira Clone
                </div>

                <div className="sprint-container">
                    {statesArray.map(state => {
                        return (
                            <StateCol
                                FSMtasks={this.filterTasks(state, updatedTasks)}
                                active={
                                    activeTargets
                                        ? activeTargets.indexOf(state) !== -1
                                        : false
                                }
                                key={state}
                                title={state}
                                handleTaskStateChange={
                                    this.handleTaskStateChange
                                }
                            />
                        );
                    })}
                </div>
            </Fragment>
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
    selectedTask: PropTypes.object,
    data: PropTypes.array
};
export default connect(mapStateToProps)(Sprint);
