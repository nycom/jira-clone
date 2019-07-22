import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateTask } from '../../store/actions';

const Task = props => {
    const { task, dispatch } = props;

    const handleChange = task => e => {
        task.sm.action(e.target.value);
        task.task.currentState = task.sm.action(e.target.value);
        dispatch(
            updateTask({
                ...task.task,
                currentState: task.sm.currentState.name
            })
        );
    };
    console.log('Task rendered');

    return (
        <div>
            <div>
                <select onChange={handleChange(task)}>
                    <option defaultValue key={0}>
                        please select
                    </option>

                    {Object.keys(task.sm.currentState?.transitions).map(
                        action => {
                            return (
                                <option key={action} value={action}>
                                    {action}
                                </option>
                            );
                        }
                    )}
                </select>
                <div className="task">
                    <div>{task.task.name}</div>
                    <div>{task.task.currentState}</div>
                </div>
            </div>
        </div>
    );
};

Task.propTypes = {
    task: PropTypes.object,
    dispatch: PropTypes.func,
    jiraConfig: PropTypes.array
};

export default connect()(Task);
