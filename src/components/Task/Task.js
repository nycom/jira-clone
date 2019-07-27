import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Task.scss';
import { clearTask, selectTask, updateTask } from '../../store/actions';

const Task = props => {
    const { task, dispatch } = props;

    const handleChange = task => e => {
        task.sm.action(e.target.value);
        task.baseTask.currentState = task.sm.action(e.target.value);
        dispatch(
            updateTask({
                ...task.baseTask,
                currentState: task.sm.currentState.name
            })
        );
    };
    const onDragStart = e => {
        e.dataTransfer.dropEffect = 'move';
        e.dataTransfer.setData('text/plain', task.baseTask.id);
        dispatch(
            selectTask({
                task: task.baseTask,
                transitions: task.sm.currentState.transitions
            })
        );
    };

    const onDragEnd = () => {
        dispatch(clearTask());
    };

    return (
        <div
            className="task"
            draggable
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}>
            <div>{task.baseTask.id}</div>
            <div>{task.baseTask.name}</div>
            <div>{task.baseTask.currentState}</div>
            <select onChange={handleChange(task)}>
                <option defaultValue key={0}>
                    please select
                </option>

                {Object.keys(task.sm.currentState?.transitions).map(action => {
                    return (
                        <option key={action} value={action}>
                            {action}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

Task.propTypes = {
    task: PropTypes.object,
    dispatch: PropTypes.func,
    jiraConfig: PropTypes.array
};

export default connect()(Task);
